import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrenotazioneService } from 'src/app/servizi/prenotazione.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit{

  mieiTrekking: any[] = [];
  messaggioDisiscrizioneTrekking: string = '';
  mostraAvvisoConferma: boolean = false;
  idTrekkingDaCancellare: number | null = null;

  constructor(private prenotazioneService: PrenotazioneService, private router: Router){}
  
  
  ngOnInit(): void {
    this.visualizzaTrekkingPrenotati();
  }

  visualizzaTrekkingPrenotati(){
    const token = sessionStorage.getItem('authToken');
    if(token){
      this.prenotazioneService.dammiPrenotazioni(token).subscribe({
        next: (trekkingList) => {
            console.log("Lista prenotazioni visualizzata con successo", trekkingList);
          const oggi = new Date();
          oggi.setHours(0,0,0,0); 

          // Separiamo trekking futuri e passati
          const futuri = trekkingList.filter(t => new Date(t.trekking.data) >= oggi);
          const passati = trekkingList.filter(t => new Date(t.trekking.data) < oggi);

          // Ordina futuri per data crescente (più vicino prima)
          futuri.sort((a, b) => new Date(a.trekking.data).getTime() - new Date(b.trekking.data).getTime());

          // Ordina passati per data decrescente (più recente prima)
          passati.sort((a, b) => new Date(b.trekking.data).getTime() - new Date(a.trekking.data).getTime());

          this.mieiTrekking = [...futuri, ...passati];
        },
        error: (err) => {
            console.error('Errore nel recuperare le proprie prenotazioni.', err);
        }
      })
    }
  }


  apriPopupConferma(id: number){
    this.idTrekkingDaCancellare = id;
    this.mostraAvvisoConferma = true;
  }

  togliPrenotazione(){
    const token = sessionStorage.getItem('authToken');
    if (token && this.idTrekkingDaCancellare !== null) {
      this.prenotazioneService.disiscriviPartecipazione(this.idTrekkingDaCancellare, token).subscribe({
        next: () => {
          console.log('Prenotazione cancellata con successo!');
          this.visualizzaTrekkingPrenotati();
          this.mostraAvvisoConferma = false;
          this.idTrekkingDaCancellare = null;
          this.messaggioDisiscrizioneTrekking = "Iscrizione al trekking rimossa correttamente!"
        }, 
        error: (err) => {
          console.error('Errore durante la cancellazione della prenotazione', err);
        }
      })
    }
  }


  isDataPassata(dataString: string): boolean {
    const dataTrekking = new Date(dataString);
    const oggi = new Date();

    // Resetta orario di oggi a mezzanotte per confronto solo con la data
    oggi.setHours(0, 0, 0, 0);
    dataTrekking.setHours(0, 0, 0, 0);

    return dataTrekking < oggi;
  }
  

}
