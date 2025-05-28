package com.example.partecipazione_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.partecipazione_service.model.Partecipazione;
import com.example.partecipazione_service.model.PartecipazioneTrekkingDTO;
import com.example.partecipazione_service.service.PartecipazioneService;


@RestController
@RequestMapping("/api/partecipazione")
public class PartecipazioneController {

    //att
    private final PartecipazioneService partecipazioneService;

    //cost
    public PartecipazioneController(PartecipazioneService partecipazioneService){
        this.partecipazioneService = partecipazioneService;
    }

    //metodi
    @PostMapping("/partecipa/{trekkingId}")
    public boolean partecipaTrekking(@PathVariable Long trekkingId, @RequestHeader("Authorization") String token){
        boolean succ = partecipazioneService.partecipaTrekking(trekkingId, token);
        return succ;
    }

    @DeleteMapping("/disiscriviti/{trekkingId}")
    public boolean disiscriviti(@PathVariable Long trekkingId, @RequestHeader("Authorization") String token){
        boolean succ = partecipazioneService.disiscriviPartecipazioneTrekking(trekkingId, token);
        return succ;
    }

    @GetMapping("/visualizzaPrenotazioni")
    public List<PartecipazioneTrekkingDTO> dammiPrenotazioni(@RequestHeader("Authorization") String token){
        return partecipazioneService.dammiTuttePartecipazioniPersonali(token);
    }

}
