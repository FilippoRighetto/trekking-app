package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Utente;

public interface UserRepository extends JpaRepository<Utente, Long>{
    Optional<Utente> findByEmail(String email);
    
    Optional<Utente> findByUsername(String username);
}
