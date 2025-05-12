package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disabilita CSRF
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()  // Consenti l'accesso a tutte le rotte senza autenticazione
            )
            .httpBasic().disable();  // Disabilita l'autenticazione basata su HTTP Basic

        return http.build();
    }
}