package com.example.partecipazione_service.model;

import java.time.LocalDateTime;

public class PartecipazioneTrekkingDTO {
    private Long idPartecipazione;
    private LocalDateTime dataPrenotazione;
    private Trekking trekking;

    public PartecipazioneTrekkingDTO() {}

    public PartecipazioneTrekkingDTO(Long idPartecipazione, LocalDateTime dataPrenotazione, Trekking trekking) {
        this.idPartecipazione = idPartecipazione;
        this.dataPrenotazione = dataPrenotazione;
        this.trekking = trekking;
    }

    public Long getIdPartecipazione() {
        return idPartecipazione;
    }

    public void setIdPartecipazione(Long idPartecipazione) {
        this.idPartecipazione = idPartecipazione;
    }

    public LocalDateTime getDataPrenotazione() {
        return dataPrenotazione;
    }

    public void setDataPrenotazione(LocalDateTime dataPrenotazione) {
        this.dataPrenotazione = dataPrenotazione;
    }

    public Trekking getTrekking() {
        return trekking;
    }

    public void setTrekking(Trekking trekking) {
        this.trekking = trekking;
    }
}
