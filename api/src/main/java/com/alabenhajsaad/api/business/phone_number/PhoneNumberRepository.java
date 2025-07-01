package com.alabenhajsaad.api.business.phone_number;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PhoneNumberRepository extends JpaRepository<PhoneNumber, Integer> {
    boolean existsByNumberIn(List<String> numberList);

}
