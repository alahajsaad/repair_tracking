package com.alabenhajsaad.api.business.reparation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface ReparationService {
    Reparation addReparation(Reparation reparation) ;
    Reparation getReparationByCallNumber(String callNumber) ;
    Page<Reparation> getReparations( Integer partnerId, Integer machineId, RepairStatus status, LocalDate fromDate, LocalDate toDate, Pageable pageable);
    Reparation getReparationById(Integer id) ;
    List<Reparation> getReparationByMachineId(Integer id) ;
    void deleteReparation(Integer id) ;
    String getCallNumber() ;

}
