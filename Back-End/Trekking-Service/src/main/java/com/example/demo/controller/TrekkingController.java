package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Trekking;
import com.example.demo.service.TrekkingService;

@RestController
@RequestMapping("/api/trekking")
public class TrekkingController {

    private final TrekkingService trekkingService;

    public TrekkingController(TrekkingService trekkingService) {
        this.trekkingService = trekkingService;
    }


    @PostMapping("/aggiungi")
    public boolean creaTrekking(@RequestBody Trekking trekking, @RequestHeader("Authorization") String token) {
        boolean success = trekkingService.registerTrekking(trekking, token);
        return success;
    }
    
    @GetMapping("/visualizzaTutti")
    public List<Trekking> getTrekkingPubblici(@RequestHeader("Authorization") String token) {
        return trekkingService.getTrekkingPubblici(token);
    }
    
    @GetMapping("/visualizzaMiei")
    public List<Trekking> getTrekkingPersonali(@RequestHeader("Authorization") String token) {
        return trekkingService.getTrekkingPersonali(token);
    }
    
    @DeleteMapping("/cancella/{id}")
    public boolean eliminaTrekking(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        boolean success = trekkingService.deleteTrekking(id, token);
        return success;
    }
    
    @PutMapping("/modifica/{id}")
    public boolean aggiornaTrekking(@PathVariable Long id, @RequestBody Trekking nuovoTrekking, @RequestHeader("Authorization") String token) {
        boolean success = trekkingService.updateTrekking(id, nuovoTrekking, token);
        return success;
    }
    
    @GetMapping("/visualizzaSingolo/{id}")
    public Trekking getTrekkingById(@PathVariable Long id) {
        return trekkingService.getTrekkingById(id);
    }

    
}





