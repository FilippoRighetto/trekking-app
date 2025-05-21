package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;


import com.example.demo.model.Utente;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	//att
	private final UserService userService;
	
	//cost
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	//metodi
	
	@PostMapping("/register")
	public boolean register(@RequestBody Utente user) {
		userService.registerUser(user);
		return true;	
	}
	
	@GetMapping("/login")
	public String login(@RequestParam String email, @RequestParam String password) {
	    return userService.loginUser(email, password);
	}
	
	@DeleteMapping("/logout")
	public String logOut(HttpServletRequest request) {
	    String token = request.getHeader("Authorization");
	    if (token == null || token.isBlank()) {
	        throw new RuntimeException("Token mancante");
	    }
	    userService.logOutUser(token);
	    return "Logout avvenuto con successo!";
	}
	
	@GetMapping("/profile")
	public Utente getProfile(HttpServletRequest request) {
		return (Utente) request.getAttribute("utenteAutenticato");
	}
	
	@PutMapping("/profile")
	public Utente updateProfile(HttpServletRequest request, @RequestBody Utente updatedUser, @RequestParam String passwordAttuale) {
	    Utente utente = (Utente) request.getAttribute("utenteAutenticato");
		return userService.updateProfile(utente, updatedUser, passwordAttuale);
	}
}
