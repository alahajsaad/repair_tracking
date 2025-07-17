package com.alabenhajsaad.api.business.reparation;

import com.alabenhajsaad.api.business.reparation_details.ReparationDetail;
import com.alabenhajsaad.api.business.machine.Machine;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Reparation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String callNumber ;
    private String customerComplaint ;
    private LocalDate entryDate ;
    private LocalDate releaseDate ;
    private Boolean shouldBeDelivered;
    @Enumerated(EnumType.STRING)
    private RepairStatus repairStatus ;

    @OneToMany(mappedBy = "reparation", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<ReparationDetail> detailsList;

    @ManyToOne
    private Machine machine ;


}
