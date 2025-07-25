package com.alabenhajsaad.api.business.partner.partner;


import com.alabenhajsaad.api.business.partner.EntityType;
import com.alabenhajsaad.api.business.partner.PartnerType;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class PartnerSpecification {

    private PartnerSpecification() {}

    public static Specification<Partner> hasPartnerType(PartnerType partnerType) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("partnerType"), partnerType);
    }

    public static Specification<Partner> matchesSearchTerm(String searchTerm) {
        return (root, query, criteriaBuilder) -> {
            if (searchTerm == null || searchTerm.trim().isEmpty()) {
                return criteriaBuilder.conjunction(); // pas de filtre
            }

            String likePattern = "%" + searchTerm.toLowerCase() + "%";

            Join<Object, Object> personJoin = root.join("person", JoinType.LEFT);
            Join<Object, Object> orgJoin = root.join("organization", JoinType.LEFT);

            Expression<String> personFullName = criteriaBuilder.lower(
                    criteriaBuilder.concat(
                            criteriaBuilder.concat(personJoin.get("firstName"), " "),
                            personJoin.get("lastName")
                    )
            );

            Expression<String> companyName = criteriaBuilder.lower(orgJoin.get("companyName"));

            Predicate personPredicate = criteriaBuilder.and(
                    criteriaBuilder.equal(root.get("entityType"), EntityType.PERSON),
                    criteriaBuilder.like(personFullName, likePattern)
            );

            Predicate orgPredicate = criteriaBuilder.and(
                    criteriaBuilder.equal(root.get("entityType"), EntityType.ORGANIZATION),
                    criteriaBuilder.like(companyName, likePattern)
            );

            return criteriaBuilder.or(personPredicate, orgPredicate);
        };
    }
}

