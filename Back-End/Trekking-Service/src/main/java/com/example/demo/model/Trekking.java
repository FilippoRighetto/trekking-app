package com.example.demo.model;

import java.time.*;

import jakarta.persistence.*;

@Entity
public class Trekking {
	
	//ATTRIBUTI
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 100)
	private String titolo;
	
	@Column(nullable = false, length = 400)
	private String descrizione;
	
	@Column(nullable = false)
	private LocalDate data;
	
	@Column(nullable = false)
	private LocalTime orario;
	
	@Column(nullable = false, length = 150)
	private String luogo;
	
	@Column(nullable = false, length = 150)
	private String puntoPartenza;
	
	@Column(nullable = false)
	private Long difficolta;
	
	@Column(nullable = false)
	private Double durataOre;
	
	@Column(nullable = false)
	private Long organizzatoreId;
	
	@Column(nullable = false)
	private LocalDateTime dataCreazione;
	
	
	//COSTRUTTORI
	public Trekking() {}
	
    public Trekking(String titolo, String descrizione, LocalDate data, LocalTime orario, String luogo, String puntoPartenza, Long difficolta, Double durataOre, Long organizzatoreId, LocalDateTime dataCreazione) {
	this.titolo = titolo;
	this.descrizione = descrizione;
	this.data = data;
	this.orario = orario;
	this.luogo = luogo;
	this.puntoPartenza = puntoPartenza;
	this.difficolta = difficolta;
	this.durataOre = durataOre;
	this.organizzatoreId = organizzatoreId;
	this.dataCreazione = LocalDateTime.now();
    }
    
    //GETTER E SETTER
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