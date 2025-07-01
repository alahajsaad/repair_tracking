package com.alabenhajsaad.api.business.phone_number;

import com.alabenhajsaad.api.business.client.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class PhoneNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    @Column(unique = true)
    private String number ;

    @ManyToOne
    @JsonIgnore
    private Client client;
}
