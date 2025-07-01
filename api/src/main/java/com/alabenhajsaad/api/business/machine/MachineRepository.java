package com.alabenhajsaad.api.business.machine;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MachineRepository extends JpaRepository<Machine,Integer> {
    List<Machine> findMachinesByClientId(int id) ;
    Boolean existsByReference (String reference);
}
