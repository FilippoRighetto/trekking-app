package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.example.demo.model.UtenteLoggato;

import jakarta.transaction.Transactional;


public interface UtenteLoggatoRepository extends JpaRepository<UtenteLoggato, Long> {

    Optional<UtenteLoggato> findByToken(String token);

	@Modifying
	@Transactional
    void deleteByToken(String token);  
}
