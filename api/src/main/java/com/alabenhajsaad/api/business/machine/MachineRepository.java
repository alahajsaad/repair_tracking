package com.alabenhajsaad.api.business.machine;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MachineRepository extends JpaRepository<Machine,Integer> {
    List<Machine> findMachinesByPartnerId(int id) ;
    Boolean existsByReference (String reference);
    Page<Machine> findAll(Specification<Machine> spec, Pageable pageable);
}
