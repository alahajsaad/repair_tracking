package com.alabenhajsaad.api.business.company;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Optional<Company> findFirstByOrderByIdAsc();
}
