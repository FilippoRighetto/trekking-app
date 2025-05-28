package com.example.partecipazione_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.partecipazione_service.model.Partecipazione;



public interface PartecipazioneRepository extends JpaRepository<Partecipazione, Long>{
    
    void deleteByTrekkingIdAndUtenteId(Long trekkingId, Long utenteId);
    
    List<Partecipazione> findByUtenteId(Long trekkingId);

    Partecipazione findByTrekkingIdAndUtenteId(Long trekkingId, Long utenteId);
}
