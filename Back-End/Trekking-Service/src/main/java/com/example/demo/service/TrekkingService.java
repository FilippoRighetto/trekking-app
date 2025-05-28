package com.example.demo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.model.Trekking;
import com.example.demo.model.Utente;
import com.example.demo.repository.TrekkingRepository;



@Service
public class TrekkingService {
	
	//att
	private final TrekkingRepository trekkingRepository;
	private final RestTemplate restTemplate;
	
	//cost
	public TrekkingService(TrekkingRepository trekkingRepository, RestTemplate restTemplate) {
		this.trekkingRepository = trekkingRepository;
		this.restTemplate = restTemplate;
	}
	
	//metodi
	
	public boolean registerTrekking(Trekking trekking, String token) {
		Utente utente = getUtenteLoggato(token);
		if(utente == null) return false;
		
		trekking.setOrganizzatoreId(utente.getId());
		trekking.setDataCreazione(LocalDateTime.now());
		trekkingRepository.save(trekking);
		return true;
	}
	
	
	public List<Trekking> getTrekkingPubblici(String token) {
			Utente utente = getUtenteLoggato(token);
			if (utente == null) return List.of(); // oppure solleva eccezione

	    LocalDate oggi = LocalDate.now();
	    return trekkingRepository.findByOrganizzatoreIdNotAndDataAfter(utente.getId(), oggi);
	}
	
	public List<Trekking> getTrekkingPersonali(String token) {
	    Utente utente = getUtenteLoggato(token);
	    if (utente == null) return List.of(); // oppure solleva eccezione

	    // Cerca tutti i trekking dove l'organizzatore è l'utente loggato
	    return trekkingRepository.findByOrganizzatoreId(utente.getId());
	}
	
	
	public boolean deleteTrekking(Long id, String token) {
		Utente utente = getUtenteLoggato(token);
		if(utente == null) return false;
		
		Trekking esistente = trekkingRepository.findById(id).orElse(null);
		if(esistente == null) return false;
		
		if(!esistente.getOrganizzatoreId().equals(utente.getId())) {
			return false;
		}
		
		trekkingRepository.deleteById(id);
		return true;
	}
	
	
	public boolean updateTrekking(Long id, Trekking nuovoTrekking, String token) {
		Utente utente = getUtenteLoggato(token);
		if(utente == null) return false;
		
		Trekking esistente = trekkingRepository.findById(id).orElse(null);
		if(esistente == null) return false;
		
		if(!esistente.getOrganizzatoreId().equals(utente.getId())) {
			return false;
		}
		
	    esistente.setTitolo(nuovoTrekking.getTitolo());
	    esistente.setDescrizione(nuovoTrekking.getDescrizione());
	    esistente.setData(nuovoTrekking.getData());
	    esistente.setOrario(nuovoTrekking.getOrario());
	    esistente.setLuogo(nuovoTrekking.getLuogo());
	    esistente.setPuntoPartenza(nuovoTrekking.getPuntoPartenza());
	    esistente.setDifficolta(nuovoTrekking.getDifficolta());
	    esistente.setDurataOre(nuovoTrekking.getDurataOre());

	    trekkingRepository.save(esistente);
	    return true;
	}
	
	
	public Trekking getTrekkingById(Long id) {
		return trekkingRepository.findById(id).orElse(null);
	}
	
	

	
    public Utente getUtenteLoggato(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Utente> response = restTemplate.exchange(
            "http://localhost:8081/api/user/profile",
            HttpMethod.GET,
            entity,
            Utente.class
        );

        return response.getBody();
    }
    

}
