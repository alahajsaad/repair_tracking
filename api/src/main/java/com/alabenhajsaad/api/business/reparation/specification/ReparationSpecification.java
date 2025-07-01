package com.alabenhajsaad.api.business.reparation.specification;


import com.alabenhajsaad.api.business.reparation.Reparation;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class ReparationSpecification {

    public static Specification<Reparation> hasClientPhoneNumber(String phoneNumber) {
        return (root, query, criteriaBuilder) -> {
            if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
                return criteriaBuilder.conjunction(); // Ne rien ajouter à la requête
            }
            Join<Object, Object> client = root.join("machine").join("client");
            Join<Object, Object> phoneNumbers = client.join("phoneNbsList");
            return criteriaBuilder.equal(phoneNumbers.get("number"), phoneNumber);
        };
    }

    public static Specification<Reparation> hasMachineReference(String reference) {
        return (root, query, criteriaBuilder) -> {
            if (reference == null || reference.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("machine").get("reference"), reference);
        };
    }


    /*public static Specification<Reparation> hasStatus(RepairStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null) {
                return criteriaBuilder.conjunction();
            }
          
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }*/
}

