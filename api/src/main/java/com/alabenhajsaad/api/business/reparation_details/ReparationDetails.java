package com.alabenhajsaad.api.business.reparation_details;

import com.alabenhajsaad.api.business.reparation.Reparation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ReparationDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String description ;
    private double price ;

    @ManyToOne
    @JsonIgnore
    private Reparation reparation ;
}
