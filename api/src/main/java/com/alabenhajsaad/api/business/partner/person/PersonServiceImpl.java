package com.alabenhajsaad.api.business.partner.person;

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
@Transactional
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService{

    private final PersonRepository personRepository;
    private final PhoneNumberService phoneNumberService;


    @Override
    public Person createPerson(Person person) {
        validatePhoneNumbers(person, false);
        handlePersonRelations(person);

        return personRepository.save(person);
    }


    @Override
    @Transactional
    public Person updatePerson(Person updatedPerson) {
        Person existing = personRepository.findById(updatedPerson.getId())
                .orElseThrow(() -> new EntityNotFoundException("Person not found"));

        // Mettre à jour les champs simples
        if (updatedPerson.getFirstName() != null &&
                !updatedPerson.getFirstName().equals(existing.getFirstName())) {
            existing.setFirstName(updatedPerson.getFirstName());
        }

        if (updatedPerson.getLastName() != null &&
                !updatedPerson.getLastName().equals(existing.getLastName())) {
            existing.setLastName(updatedPerson.getLastName());
        }



        // Remplacer les adresses
        if (updatedPerson.getAddresses() != null) {
            existing.getAddresses().clear();
            updatedPerson.getAddresses().forEach(addr -> {
                addr.setPartner(existing);
                existing.getAddresses().add(addr);
            });
        }

        // Mettre à jour les numéros de téléphone
        if (updatedPerson.getPhoneNumbers() != null) {
            List<PhoneNumber> existingPhones = new ArrayList<>(existing.getPhoneNumbers());

            // Supprimer les numéros absents dans updatedPerson
            for (PhoneNumber existingPhone : existingPhones) {
                boolean foundInUpdated = updatedPerson.getPhoneNumbers().stream()
                        .anyMatch(updatedPhone -> Objects.equals(updatedPhone.getNumber(), existingPhone.getNumber()));

                if (!foundInUpdated) {
                    existing.getPhoneNumbers().remove(existingPhone);
                    phoneNumberService.deletePhoneNumber(existingPhone.getId());
                }
            }

            // Ajouter ou mettre à jour
            for (PhoneNumber updatedPhone : updatedPerson.getPhoneNumbers()) {
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

        return personRepository.save(existing);
    }


    @Override
    public Person findById(Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Person not found"));
    }

    @Override
    public Page<Person> getPersons(Pageable pageable, PartnerType roleType, String keyword) {
        Specification<Person> specification = Specification
                .where(PersonSpecification.hasKeyword(keyword))
                .and(PersonSpecification.hasRoleType(roleType)) ;

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return personRepository.findAll(specification, pageable);
    }


    private void handlePersonRelations(Person person) {
        if (person.getAddresses() != null) {
            person.getAddresses().forEach(address -> address.setPartner(person));
        }
        if (person.getPhoneNumbers() != null) {
            person.getPhoneNumbers().forEach(phone -> phone.setPartner(person));
        }
    }

    private void validatePhoneNumbers(Person person, boolean isUpdate) {
        List<PhoneNumber> numberList = person.getPhoneNumbers();
        if (numberList == null || numberList.isEmpty()) {
            throw new EntityNotFoundException(ErrorMessages.NO_PHONE_NUMBER);
        }

        numberList.forEach(phone -> {
            Optional<Person> existingPerson = personRepository.findPersonByPhoneNumber(phone.getNumber());
            if (existingPerson.isPresent()) {
                boolean samePerson = existingPerson.get().getId().equals(person.getId());
                if (!isUpdate || !samePerson) {
                    throw new ConflictException("Le numéro de téléphone '" + phone.getNumber() +
                            "' est déjà utilisé par " + existingPerson.get().getFullName());

                }
            }
        });
    }


}

