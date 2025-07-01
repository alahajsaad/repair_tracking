package com.alabenhajsaad.api.business.reparation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReparationService {
    String addReparation(Reparation reparation) ;
    Reparation getReparationByCallNumber(String callNumber) ;
    Page<Reparation> getFiltredReparations(String machineRef, String clientPhoneNumber, Pageable pageable);
    Reparation getReparationById(int id) ;
    List<Reparation> getReparationByMachineId(Integer id) ;
    void deleteReparation(Integer id) ;

}
