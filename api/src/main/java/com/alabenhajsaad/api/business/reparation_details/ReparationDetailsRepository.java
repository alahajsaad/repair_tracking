package com.alabenhajsaad.api.business.reparation_details;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReparationDetailsRepository extends JpaRepository<ReparationDetail, Integer> {
    List<ReparationDetail> findByReparationId(int reparationId);
}
