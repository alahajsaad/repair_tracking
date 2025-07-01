package com.alabenhajsaad.api.business.details;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailsRepository extends JpaRepository<Details, Integer> {
    List<Details> findByReparationId(int reparationId);
}
