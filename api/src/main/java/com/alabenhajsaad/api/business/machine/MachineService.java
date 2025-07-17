package com.alabenhajsaad.api.business.machine;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MachineService {
    Machine addMachine(Machine machine) ;
    Machine updateMachine(Machine machine) ;
    Machine getMachineById(int id) ;
    Page<Machine> getReparations(Integer partnerId, Pageable pageable);
    List<Machine> getMachinesByClientID(int id) ;
    void deleteMachineById(Integer id);
    Long getMachineCount() ;

}
