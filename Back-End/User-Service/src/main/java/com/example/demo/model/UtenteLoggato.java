package com.example.demo.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class UtenteLoggato {
	
	//ATT
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private Utente utente;
	
	@Column(nullable = false, unique = true, length = 255)
	private String token;
	
	@Column(nullable = false)
	private LocalDateTime dataScadenza;
	
	//COST
	public UtenteLoggato() {}
	
	public UtenteLoggato(Utente utente, String token, LocalDateTime dataScadenza) {
		this.utente = utente;
		this.token = token;
		this.dataScadenza = dataScadenza;
	}
	
	//GETTER E SETTER
	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utente getUtente() {
        return utente;
    }

    public void setUtente(Utente utente) {
        this.utente = utente;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getDataScadenza() {
        return dataScadenza;
    }

    public void setDataScadenza(LocalDateTime dataScadenza) {
        this.dataScadenza = dataScadenza;
    }
	
	

}
