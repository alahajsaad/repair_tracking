package com.alabenhajsaad.api.business.machine;

import org.springframework.data.jpa.domain.Specification;

public class MachineSpecification {
    private MachineSpecification(){}

    public static Specification<Machine> hasPartnerId(Integer partnerId) {
        return (root, query, criteriaBuilder) -> {
            if (partnerId == null) {
                return criteriaBuilder.conjunction(); // always true
            }
            return criteriaBuilder.equal(root.get("partner").get("id"), partnerId);
        };
    }

}
