package com.alabenhajsaad.api.business.partner.organization;

import com.alabenhajsaad.api.business.partner.PartnerType;
import com.alabenhajsaad.api.business.partner.phone_number.PhoneNumber;
import com.alabenhajsaad.api.business.partner.phone_number.PhoneNumberService;
import com.alabenhajsaad.api.business.utils.ErrorMessages;
import com.alabenhajsaad.api.exception.ConflictException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final PhoneNumberService phoneNumberService;
    @Override
    @Transactional
    public Organization createOrganization(Organization organization) {

        validatePhoneNumbers(organization,false);
        handleOrganizationRelations(organization);

        return organizationRepository.save(organization);
    }

    @Override
    @Transactional
    public Organization updateOrganization(Organization updatedOrganization) {
        Organization existing = organizationRepository.findById(updatedOrganization.getId())
                .orElseThrow(() -> new EntityNotFoundException("Organization not found"));

        // Merge scalar fields (only if not null or changed)
        if (updatedOrganization.getCompanyName() != null &&
                !updatedOrganization.getCompanyName().equals(existing.getCompanyName())) {
            existing.setCompanyName(updatedOrganization.getCompanyName());
        }

        if (updatedOrganization.getRegistrationNumber() != null &&
                !updatedOrganization.getRegistrationNumber().equals(existing.getRegistrationNumber())) {
            existing.setRegistrationNumber(updatedOrganization.getRegistrationNumber());
        }

        if (updatedOrganization.getTaxNumber() != null &&
                !updatedOrganization.getTaxNumber().equals(existing.getTaxNumber())) {
            existing.setTaxNumber(updatedOrganization.getTaxNumber());
        }





        // Replace addresses
        if (updatedOrganization.getAddresses() != null) {
            existing.getAddresses().clear();
            updatedOrganization.getAddresses().forEach(addr -> {
                addr.setPartner(existing); // Set FK back-reference
                existing.getAddresses().add(addr);
            });
        }

        // Mettre à jour les numéros de téléphone
        if (updatedOrganization.getPhoneNumbers() != null) {
            List<PhoneNumber> existingPhones = new ArrayList<>(existing.getPhoneNumbers());

            // Supprimer les numéros absents dans updatedPerson
            for (PhoneNumber existingPhone : existingPhones) {
                boolean foundInUpdated = updatedOrganization.getPhoneNumbers().stream()
                        .anyMatch(updatedPhone -> Objects.equals(updatedPhone.getNumber(), existingPhone.getNumber()));

                if (!foundInUpdated) {
                    existing.getPhoneNumbers().remove(existingPhone);
                    phoneNumberService.deletePhoneNumber(existingPhone.getId());
                }
            }

            // Ajouter ou mettre à jour
            for (PhoneNumber updatedPhone : updatedOrganization.getPhoneNumbers()) {
                Optional<PhoneNumber> optionalExistingPhone = existing.getPhoneNumbers().stream()
                        .filter(p -> Objects.equals(p.getNumber(), updatedPhone.getNumber()))
                        .findFirst();

                if (optionalExistingPhone.isPresent()) {
                   // do nothing
                } else {
                    // Nouveau numéro
                    Optional<PhoneNumber> other = phoneNumberService.findByNumber(updatedPhone.getNumber());
                    if (other.isPresent()) {
                        throw new IllegalArgumentException("Phone number already exists: " + updatedPhone.getNumber());
                    }
                    updatedPhone.setPartner(existing);
                    existing.getPhoneNumbers().add(updatedPhone);
                }
            }
        }

        return organizationRepository.save(existing); // No insert, just update
    }

    @Override
    public Organization findById(Long id) {
        return organizationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Organization not found"));
    }

    @Override
    public Page<Organization> getOrganizations(Pageable pageable, PartnerType roleType, String keyword) {
        Specification<Organization> specification = Specification
                .where(OrganizationSpecification.hasKeyword(keyword))
                .and(OrganizationSpecification.hasRoleType(roleType)) ;

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return organizationRepository.findAll(specification, pageable);
    }


    private void handleOrganizationRelations(Organization organization) {
        if (organization.getAddresses() != null) {
            organization.getAddresses().forEach(address -> address.setPartner(organization));
        }
        if (organization.getPhoneNumbers() != null) {
            organization.getPhoneNumbers().forEach(phone -> phone.setPartner(organization));
        }
    }

    private void validatePhoneNumbers(Organization organization, boolean isUpdate) {
        List<PhoneNumber> numberList = organization.getPhoneNumbers();
        if (numberList == null || numberList.isEmpty()) {
            throw new EntityNotFoundException(ErrorMessages.NO_PHONE_NUMBER);
        }

        numberList.forEach(phone -> {
            Optional<Organization> existingOrg = organizationRepository.findOrganizationByPhoneNumber(phone.getNumber());
            if (existingOrg.isPresent()) {
                boolean sameOrganization = existingOrg.get().getId().equals(organization.getId());
                if (!isUpdate || !sameOrganization) {
                    throw new ConflictException("Le numéro de téléphone '" + phone.getNumber() +
                            "' est déjà utilisé par " + existingOrg.get().getCompanyName());

                }
            }
        });
    }
}
