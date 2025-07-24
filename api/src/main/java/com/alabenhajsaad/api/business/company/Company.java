package com.alabenhajsaad.api.business.company;

import com.alabenhajsaad.api.business.utils.Auditable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Company extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String companyName;
    private String companyAddress;
    private String companyPhoneNumber;
    private String companyEmail;
    private String logoUrl;
    private String generalConditions ;
    private Boolean isActive ;

}
