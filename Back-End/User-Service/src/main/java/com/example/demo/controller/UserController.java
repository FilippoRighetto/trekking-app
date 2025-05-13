package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

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
	public Utente register(@RequestBody Utente user) {
		return userService.registerUser(user);
	}
	
	@GetMapping("/login")
	public Utente login(@RequestParam String email, @RequestParam String password) {
	    System.out.println("EMAIL: " + email);
	    System.out.println("PASSWORD: " + password);
	    return userService.loginUser(email, password);
	}
	
	@GetMapping("/profile")
	public Utente getProfile(@RequestParam String username) {
		return userService.getProfile(username);
	}
	
	@PutMapping("/profile")
	public Utente updateProfile(@RequestParam String username, @RequestBody Utente updatedUser) {
		return userService.updateProfile(username, updatedUser);
	}
}
