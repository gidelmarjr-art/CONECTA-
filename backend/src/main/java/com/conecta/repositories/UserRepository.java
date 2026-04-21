package com.conecta.repositories;

import com.conecta.entities.Databaseconnection;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Databaseconnection, Integer> {

    Optional<Databaseconnection> findByEmail(String encryptedEmail);

    Optional<Databaseconnection> findByCPF(String encryptedCPF);
}
