package com.example.partecipazione_service.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Trekking {

    private Long id;
    private String titolo;
    private String descrizione;
    private LocalDate data;
    private LocalTime orario;
    private String luogo;
    private String puntoPartenza;
    private Long difficolta;
    private Double durataOre;
    private Long organizzatoreId;
    private LocalDateTime dataCreazione;

    public Trekking() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getOrario() {
        return orario;
    }

    public void setOrario(LocalTime orario) {
        this.orario = orario;
    }

    public String getLuogo() {
        return luogo;
    }

    public void setLuogo(String luogo) {
        this.luogo = luogo;
    }

    public String getPuntoPartenza() {
        return puntoPartenza;
    }

    public void setPuntoPartenza(String puntoPartenza) {
        this.puntoPartenza = puntoPartenza;
    }

    public Long getDifficolta() {
        return difficolta;
    }

    public void setDifficolta(Long difficolta) {
        this.difficolta = difficolta;
    }

    public Double getDurataOre() {
        return durataOre;
    }

    public void setDurataOre(Double durataOre) {
        this.durataOre = durataOre;
    }

    public Long getOrganizzatoreId() {
        return organizzatoreId;
    }

    public void setOrganizzatoreId(Long organizzatoreId) {
        this.organizzatoreId = organizzatoreId;
    }

    public LocalDateTime getDataCreazione() {
        return dataCreazione;
    }

    public void setDataCreazione(LocalDateTime dataCreazione) {
        this.dataCreazione = dataCreazione;
    }
}
