package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Utente;

public interface UserRepository extends JpaRepository<Utente, Long>{
    @Query(value = "SELECT * FROM Utente WHERE email = :email", nativeQuery = true)
    Optional<Utente> findByEmail(@Param("email") String email);
    
    @Query(value = "SELECT * FROM Utente WHERE username = :username", nativeQuery = true)
    Optional<Utente> findByUsername(@Param("username") String username);
}
