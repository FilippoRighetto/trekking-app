package com.example.partecipazione_service.service;

import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.partecipazione_service.model.Partecipazione;
import com.example.partecipazione_service.model.PartecipazioneTrekkingDTO;
import com.example.partecipazione_service.model.Trekking;
import com.example.partecipazione_service.model.Utente;
import com.example.partecipazione_service.repository.PartecipazioneRepository;

import jakarta.transaction.Transactional;


@Service
public class PartecipazioneService {

    //att
    private final PartecipazioneRepository partecipazioneRepository;
    private final RestTemplate restTemplate;

    //cost
	public PartecipazioneService(PartecipazioneRepository partecipazioneRepository, RestTemplate restTemplate) {
		this.partecipazioneRepository = partecipazioneRepository;
		this.restTemplate = restTemplate;
	}

    //metodi
    public Boolean partecipaTrekking(Long trekkingId, String token){
        Utente utente = getUtenteLoggato(token);
        if(utente == null) return false;

        Partecipazione esistente = partecipazioneRepository.findByTrekkingIdAndUtenteId(trekkingId, utente.getId());
        if (esistente != null) return false;

        Partecipazione partecipazione = new Partecipazione();
        partecipazione.setTrekkingId(trekkingId);
        partecipazione.setUtenteId(utente.getId());
        partecipazioneRepository.save(partecipazione);

        return true;
    }

    @Transactional
    public boolean disiscriviPartecipazioneTrekking(Long trekkingId, String token){
        Utente utente = getUtenteLoggato(token);
        if(utente == null) return false;

        partecipazioneRepository.deleteByTrekkingIdAndUtenteId(trekkingId, utente.getId());
        return true;
    }

    
    public List<PartecipazioneTrekkingDTO> dammiTuttePartecipazioniPersonali(String token){
        Utente utente = getUtenteLoggato(token);
	    if (utente == null) return List.of();

        List<Partecipazione> partecipazioni = partecipazioneRepository.findByUtenteId(utente.getId());

        return partecipazioni.stream().map( p -> {
            Trekking trekking  = getTrekkingById(p.getTrekkingId());
            return new PartecipazioneTrekkingDTO(
                p.getId(),
                p.getDataPrenotazione(),
                trekking
            );
        }).toList();
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

    public Trekking getTrekkingById(Long trekkingId){
        return restTemplate.getForObject("http://localhost:8082/api/trekking/visualizzaSingolo/" + trekkingId, Trekking.class);
    }


}