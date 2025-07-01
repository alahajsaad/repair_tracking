package com.alabenhajsaad.api.business.client;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {

    @Query("SELECT c FROM Client c JOIN c.phoneNumbers p WHERE p.number LIKE :phoneNumber%")
    Page<Client> findByPhoneNumbersStartingWith(@Param("phoneNumber") String phoneNumber, Pageable pageable);

    @Query("SELECT c FROM Client c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Client> searchByName(@Param("name") String name, Pageable pageable);

    @Query("SELECT COUNT(p) > 0 FROM Client c JOIN c.phoneNumbers p WHERE p.number = :phoneNumber")
    Boolean existsClientByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    @Modifying
    @Transactional
    @Query("DELETE FROM PhoneNumber p WHERE p.client.id = :clientId AND p.number = :phoneNumber")
    void deleteClientPhoneNumber(@Param("phoneNumber") String phoneNumber, @Param("clientId") int clientId);

    @Query("SELECT c FROM Client c JOIN c.phoneNumbers p WHERE p.number = :phoneNumber")
    Optional<Client> findClientByPhoneNumber(@Param("phoneNumber") String phoneNumber);

}
