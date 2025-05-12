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
		//controllo se email già presente
		if(userRepository.findByEmail(user.getEmail()).isPresent()) {
			throw new RuntimeException("Email già in uso");
		}
		//controllo se username già presente
		if(userRepository.findByUsername(user.getUsername()).isPresent()) {
			throw new RuntimeException("Username già in uso");
		}
		
		//cifratura della password
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		user.setDataDiRegistrazione(LocalDate.now());
		
		return userRepository.save(user);
	}
	
	
	public String loginUser(String username, String password) {
		
		Utente user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Username non trovato"));
		
		if(!passwordEncoder.matches(password, user.getPassword())) {
			throw new RuntimeException("Password errata!");
		}
		return "Login effettuato con successo per " + user.getUsername();
	}
	
	
	public Utente getProfile(String username) {
	    Optional<Utente> userOptional = userRepository.findByUsername(username);
	    return userOptional.orElseThrow(() -> 
	        new RuntimeException("L'utente con username '" + username + "' non è stato trovato"));
	}
	
	
	
	public Utente updateProfile(String username, Utente updatedUser) {
		Utente user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Utente non trovato"));
		
		user.setNome(updatedUser.getNome());
		user.setCognome(updatedUser.getCognome());
		user.setEmail(updatedUser.getEmail());
		
		if(updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
			user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
		}
		return userRepository.save(user);
	}
}
