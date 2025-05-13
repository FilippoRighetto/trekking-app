package com.example.demo.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Utente;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
	
	//ATTRIBUTI
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	
	//COSTRUTORI
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}
	
	//METODI
	public Utente registerUser(Utente user) {
	    boolean emailEsiste = userRepository.findByEmail(user.getEmail()).isPresent();
	    boolean usernameEsiste = userRepository.findByUsername(user.getUsername()).isPresent();

	    if (emailEsiste && usernameEsiste) {
	        throw new RuntimeException("1");
	    }
	    if (emailEsiste) {
	        throw new RuntimeException("2");
	    }
	    if (usernameEsiste) {
	        throw new RuntimeException("3");
	    }

	    user.setPassword(passwordEncoder.encode(user.getPassword()));
	    user.setDataDiRegistrazione(LocalDate.now());

	    return userRepository.save(user);
	}
	
	
	
	public Utente loginUser(String email, String password) {
		
		Utente user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("1"));
		
		if(!passwordEncoder.matches(password, user.getPassword())) {
			throw new RuntimeException("2");
		}
		return user;
	}
	
	
	
	public Utente getProfile(String username) {
	    Utente user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Username non trovato"));
	    return user;
	}
	
	
	
	public Utente updateProfile(String username, Utente updatedUser) {
		Utente user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Utente non trovato"));
		
		if(!user.getEmail().equals(updatedUser.getEmail())) {
			if(userRepository.findByEmail(updatedUser.getEmail()).isPresent()) {					//controllo se email già presente
				throw new RuntimeException("Email già in uso");
			}
		}
		
		if(!user.getUsername().equals(updatedUser.getUsername())) {
			if(userRepository.findByUsername(updatedUser.getUsername()).isPresent()) {				//controllo se username già presente
				throw new RuntimeException("Username già in usooooo");
			}
		}
		
		user.setEmail(updatedUser.getEmail());
		user.setUsername(updatedUser.getUsername());
		user.setNome(updatedUser.getNome());
		user.setCognome(updatedUser.getCognome());
		
		if(updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
			user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
		}
		return userRepository.save(user);
	}
}
