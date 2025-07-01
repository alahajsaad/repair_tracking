package com.alabenhajsaad.api.business.machine;

import com.alabenhajsaad.api.business.client.Client;
import com.alabenhajsaad.api.business.reparation.Reparation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    @Column(unique = true, nullable = false)
    private String reference ;
    private String designation ;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client ;

    @OneToMany(mappedBy = "machine")
    @JsonIgnore
    public List<Reparation> reparations ;


}
