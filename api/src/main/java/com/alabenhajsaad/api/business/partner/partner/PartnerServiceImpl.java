package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.PartnerType;
import com.alabenhajsaad.api.business.partner.organization.Organization;
import com.alabenhajsaad.api.business.partner.person.Person;
import com.alabenhajsaad.api.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PartnerServiceImpl implements PartnerService {
    private final PartnerRepository repository;

    @Override
    public Page<Partner> getPartners(Pageable pageable, String keyword, PartnerType type) {

//        Specification<Partner> spec = Specification
//                .where(PartnerSpecification.hasPartnerType(type))
//                .and(PartnerSpecification.matchesSearchTerm(keyword));
//
//        return repository.findAll(spec, pageable);

        return repository.findPartners(type,keyword,pageable) ;
    }

    @Override
    public Partner getPartnerById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Partner with id " + id + " not found")
        );
    }
    @Override
    public Long getPartnerCount() {
        return repository.count();
    }

    @Override
    public String getPartnerDisplayName(Partner partner) {
        if (partner == null) return null;

        return switch (partner.getEntityType()) {
            case "PERSON" -> (partner instanceof Person person) ? person.getFullName() : null;
            case "ORGANIZATION" -> (partner instanceof Organization org) ? org.getCompanyName() : null;
            default -> "Unknown Partner Type";
        };
    }


}
