package com.example.partecipazione_service.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Partecipazione {

    // ATTRIBUTI
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long utenteId;

    @Column(nullable = false)
    private Long trekkingId;

    @Column(nullable = false)
    private LocalDateTime dataPrenotazione = LocalDateTime.now();

    // COSTRUTTORI
    public Partecipazione() {
    }

    public Partecipazione(Long utenteId, Long trekkingId) {
        this.utenteId = utenteId;
        this.trekkingId = trekkingId;
    }

    // GETTER E SETTER
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUtenteId() {
        return utenteId;
    }

    public void setUtenteId(Long utenteId) {
        this.utenteId = utenteId;
    }

    public Long getTrekkingId() {
        return trekkingId;
    }

    public void setTrekkingId(Long trekkingId) {
        this.trekkingId = trekkingId;
    }

    public LocalDateTime getDataPrenotazione() {
        return dataPrenotazione;
    }

    public void setDataPrenotazione(LocalDateTime dataPrenotazione) {
        this.dataPrenotazione = dataPrenotazione;
    }

}