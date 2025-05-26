package com.example.demo.filter;

import java.io.IOException;
import org.springframework.stereotype.Component;

import com.example.demo.model.Utente;
import com.example.demo.model.UtenteLoggato;
import com.example.demo.service.UserService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthFilter implements Filter{
	
	//att
	private final UserService userService;
	
	//cost
	public AuthFilter(UserService userService) {
		this.userService = userService;
	}
	
	//metodi
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
	        throws IOException, ServletException {
	    
	    HttpServletRequest httpRequest = (HttpServletRequest) request;
	    HttpServletResponse httpResponse = (HttpServletResponse) response;
	    
	    
	    // Gestione CORS
	    httpResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
	    httpResponse.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	    httpResponse.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
	    httpResponse.setHeader("Access-Control-Allow-Credentials", "true");

	    // Rispondi subito all'OPTIONS (preflight) senza passare il filtro
	    if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
	        httpResponse.setStatus(HttpServletResponse.SC_OK);
	        return;
	    }

	    
	    String path = httpRequest.getRequestURI();
	    if (path.equals("/api/user/login") || path.equals("/api/user/register")) {
	        chain.doFilter(request, response);
	        return;
	    }

	    String token = httpRequest.getHeader("Authorization");

	    if (token == null || token.isBlank()) {
	        httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token mancante");
	        return;
	    }

	    try {
	        UtenteLoggato sessione = userService.getSessione(token);
	        
	        if (sessione.getDataScadenza().isBefore(java.time.LocalDateTime.now())) {
	            userService.invalidateSession(token);
	            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token scaduto");
	            return;
	        }

	        httpRequest.setAttribute("utenteAutenticato", sessione.getUtente());
	        chain.doFilter(httpRequest, response);

	    } catch (RuntimeException e) {
	        httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
	    }
	}
	
	

}
