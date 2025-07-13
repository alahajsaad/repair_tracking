package com.alabenhajsaad.api.business.reparation.specification;

import com.alabenhajsaad.api.business.reparation.RepairStatus;
import com.alabenhajsaad.api.business.reparation.Reparation;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

public class ReparationSpecification {
    private ReparationSpecification() {}
    /**
     * Search reparations by keyword:
     * Matches machine designation, partner companyName, or combined partner firstName + lastName
     */
    public static Specification<Reparation> hasPartnerId(Integer partnerId) {
        return (root, query, criteriaBuilder) -> {
            if (partnerId == null) {
                return criteriaBuilder.conjunction(); // always true
            }
            return criteriaBuilder.equal(root.get("machine").get("partner").get("id"), partnerId);
        };
    }
    public static Specification<Reparation> hasMachineId(Integer machineId) {
        return (root, query, criteriaBuilder) -> {
            if (machineId == null) {
                return criteriaBuilder.conjunction(); // always true
            }
            return criteriaBuilder.equal(root.get("machine").get("id"), machineId);
        };
    }

    /**
     * Filter by repair status
     */
    public static Specification<Reparation> hasStatus(RepairStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null || status == RepairStatus.ALL) {
                return criteriaBuilder.conjunction(); // always true
            }
            return criteriaBuilder.equal(root.get("repairStatus"), status);
        };
    }

    /**
     * Filter by date range: fromDate and/or toDate
     */
    public static Specification<Reparation> hasDate(LocalDate fromDate, LocalDate toDate) {
        return (root, query, criteriaBuilder) -> {
            if (fromDate == null && toDate == null) {
                return criteriaBuilder.conjunction();
            } else if (fromDate == null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("entryDate"), toDate);
            } else if (toDate == null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("entryDate"), fromDate);
            } else {
                return criteriaBuilder.between(root.get("entryDate"), fromDate, toDate);
            }
        };
    }
}
