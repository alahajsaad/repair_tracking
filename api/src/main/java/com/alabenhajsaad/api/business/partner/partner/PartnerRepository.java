package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.PartnerType;
import com.alabenhajsaad.api.business.reparation.Reparation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PartnerRepository extends JpaRepository<Partner, Long>, JpaSpecificationExecutor<Partner> {
        Page<Partner> findAll(Specification<Partner> spec, Pageable pageable);


    // Alternative avec jointure sur la relation JPA (recommandée)
    @Query("""
SELECT DISTINCT p
FROM partner p
LEFT JOIN person pe ON p.id = pe.id
LEFT JOIN organization o ON o.id = p.id
LEFT JOIN p.phoneNumbers pn
WHERE p.partnerType = :partnerType
AND (
    :searchTerm IS NULL OR :searchTerm = ''
    OR (
        (p.entityType = 'PERSON' AND LOWER(CONCAT(pe.firstName, ' ', pe.lastName)) LIKE LOWER(CONCAT('%', :searchTerm, '%')))
        OR (p.entityType = 'ORGANIZATION' AND LOWER(o.companyName) LIKE LOWER(CONCAT('%', :searchTerm, '%')))
        OR (pn.number LIKE CONCAT('%', :searchTerm, '%'))
    )
)
""")

    Page<Partner> findPartners(
            @Param("partnerType") PartnerType partnerType,
            @Param("searchTerm") String searchTerm,
            Pageable pageable
    );



}

