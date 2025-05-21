package com.example.demo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Utente;
import com.example.demo.model.UtenteLoggato;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UtenteLoggatoRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	
	//ATTRIBUTI
	private final UserRepository userRepository;
	private final UtenteLoggatoRepository utenteLoggatoRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	
	//COSTRUTORI
	public UserService(UserRepository userRepository, UtenteLoggatoRepository utenteLoggatoRepository) {
		this.userRepository = userRepository;
		this.utenteLoggatoRepository = utenteLoggatoRepository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}
	
	//METODI
	public boolean registerUser(Utente user) {
	    boolean emailEsiste = userRepository.findByEmail(user.getEmail()).isPresent();
	    boolean usernameEsiste = userRepository.findByUsername(user.getUsername()).isPresent();

	    if (emailEsiste && usernameEsiste) {
	        throw new RuntimeException("EMAIL_E_USERNAME_ESISTONO");
	    }
	    if (emailEsiste) {
	        throw new RuntimeException("EMAIL_ESISTE");
	    }
	    if (usernameEsiste) {
	        throw new RuntimeException("USERNAME_ESISTE");
	    }
	    user.setDataDiRegistrazione(LocalDate.now());
	    userRepository.save(user);
	    return true;
	}
	
	
	
	public String loginUser(String email, String password) {
		
		Utente user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("EMAIL_NON_TROVATA"));
		if(!password.equals(user.getPassword())) {
			throw new RuntimeException("PASSWORD_SBAGLIATA");
		}
		/*
		if(!password.equals(user.getPassword())) {								//da togliere e abilitare il blocco sopra dopo i test
			throw new RuntimeException("PASSWORD_SBAGLIATA");
		}*/

		String token = UUID.randomUUID().toString();
		UtenteLoggato sessione = new UtenteLoggato();
		sessione.setUtente(user);
		sessione.setToken(token);
		sessione.setDataScadenza(LocalDateTime.now().plusHours(1));
		utenteLoggatoRepository.save(sessione);
		return token;
	}
	
	
	@Transactional
	public void logOutUser(String token) {
	    utenteLoggatoRepository.deleteByToken(token);
	}
	
	/*
	@Transactional
	public Utente getProfile(String token){
	    return getSessione(token).getUtente();
	}*/
	
	
	public Utente updateProfile(Utente currentUser, Utente updatedUser, String passwordAttuale) {
	    boolean emailEsiste = false;
	    boolean usernameEsiste = false;

	    if (!currentUser.getEmail().equals(updatedUser.getEmail())) {
	        if (userRepository.findByEmail(updatedUser.getEmail()).isPresent()) {
	            emailEsiste = true;
	        }
	    }
	    if (!currentUser.getUsername().equals(updatedUser.getUsername())) {
	        if (userRepository.findByUsername(updatedUser.getUsername()).isPresent()) {
	            usernameEsiste = true;
	        }
	    }

	    if (emailEsiste && usernameEsiste) {
	        throw new RuntimeException("EMAIL_E_USERNAME_ESISTONO");
	    } else if (emailEsiste) {
	        throw new RuntimeException("EMAIL_ESISTE");
	    } else if (usernameEsiste) {
	        throw new RuntimeException("USERNAME_ESISTE");
	    }
		
	    if (passwordAttuale != null && !passwordAttuale.isBlank() && updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
	        if (!currentUser.getPassword().equals(passwordAttuale)) {
	            throw new RuntimeException("PASSWORD_ATTUALE_ERRATA");
	        }
	        currentUser.setPassword(updatedUser.getPassword());
	    }
	    currentUser.setEmail(updatedUser.getEmail());
	    currentUser.setUsername(updatedUser.getUsername());
	    currentUser.setNome(updatedUser.getNome());
	    currentUser.setCognome(updatedUser.getCognome());
		
		return userRepository.save(currentUser);
	}
	
	
	
	
	
	public UtenteLoggato getSessione(String token) {
	    return utenteLoggatoRepository.findByToken(token)
	            .orElseThrow(() -> new RuntimeException("Token non valido"));
	}

	public void invalidateSession(String token) {
	    utenteLoggatoRepository.deleteByToken(token);
	}
	
	
}
