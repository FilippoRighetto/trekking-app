package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Utente {
	
	//ATTRIBUTI
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false, unique = true, length = 50)
	private String username;
	
	@Column(nullable = false, unique = true, length = 50)
	private String email;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false, length = 50)
	private String nome;
	
	@Column(nullable = false, length = 50)
	private String cognome;
	
	@Column(name = "data_registrazione", nullable = false)
	private LocalDate dataRegistrazione;
	
	
	//COSTRUTTORI
	public Utente() {}
	
	public Utente(String username, String email, String password, String nome, String cognome, LocalDate dataRegistrazione) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.nome = nome;
		this.cognome = cognome;
		this.dataRegistrazione = LocalDate.now();
	}
	
	
	//GETTER E SETTER
	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public LocalDate getDataDiRegistrazione() {
        return dataRegistrazione;
    }

    public void setDataDiRegistrazione(LocalDate dataDiRegistrazione) {
        this.dataRegistrazione = dataDiRegistrazione;
    }
	
}