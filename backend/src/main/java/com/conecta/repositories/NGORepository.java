package com.conecta.repositories;

import com.conecta.entities.NGOData;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface NGORepository extends JpaRepository<NGOData, String> {
    Optional<NGOData> findByEmail(String email);
}