package com.alabenhajsaad.api.business.client;

import com.alabenhajsaad.api.business.machine.Machine;
import com.alabenhajsaad.api.business.phone_number.PhoneNumber;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String name ;

    @Email(message = "le format de l'email est incorrect")
    @Column(unique = true)
    private String email ;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PhoneNumber> phoneNumbers;

    @OneToMany(mappedBy = "client" )
    @JsonIgnore
    private List<Machine> machines ;

}
