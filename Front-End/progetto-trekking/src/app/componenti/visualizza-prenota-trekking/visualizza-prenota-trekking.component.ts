import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostTrekingServiceService } from 'src/app/servizi/post-treking-service.service';
import { PrenotazioneService } from 'src/app/servizi/prenotazione.service';


@Component({
  selector: 'app-visualizza-prenota-trekking',
  templateUrl: './visualizza-prenota-trekking.component.html',
  styleUrls: ['./visualizza-prenota-trekking.component.css']
})
export class VisualizzaPrenotaTrekkingComponent implements OnInit{

  tuttiTrekking: any[] = [];
  filtro = {
    testo: '',
    dataDa: null as Date | null,
    difficoltaMax: null as number | null,
    durataMax: null as number | null
  };
  mostraAvvisoConferma: boolean = false;
  idTrekkingPrenotazione: number | null = null;
  messaggioIscrizioneTrekking = '';


  constructor(private postTrekingService: PostTrekingServiceService, private prenotazioneService: PrenotazioneService,  private router: Router){}
  

  ngOnInit(): void {
    this.visualizzaTuttiTreking();
  }


  visualizzaTuttiTreking(){
    const token = sessionStorage.getItem('authToken');
    if(token){
      this.postTrekingService.dammiTuttiTrekking(token).subscribe({
        next: (trekkingList) => {
          const oggi = new Date();
          oggi.setHours(0,0,0,0); // reset ora per confronto solo data

          // Separiamo trekking futuri e passati
          const futuri = trekkingList.filter(t => new Date(t.data) >= oggi);

          // Ordina futuri per data crescente (più vicino prima)
          this.tuttiTrekking = futuri.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

        },
        error: (err) => {
          if (err.status === 401 && err.error === 'Token scaduto') {
            alert("Sessione scaduta. Effettua di nuovo il login.");
            sessionStorage.removeItem("token");
            this.router.navigate(['/login']);
          }

          console.error('Errore nel recuperare i trekking personali', err);
        }
      });
    }
  }

  filtraTrekking() {
    return this.tuttiTrekking
      .filter(t =>
        (!this.filtro.testo || `${t.titolo} ${t.descrizione} ${t.luogo}`.toLowerCase().includes(this.filtro.testo.toLowerCase())) &&
        (!this.filtro.dataDa || new Date(t.data) >= this.filtro.dataDa) &&
        (!this.filtro.difficoltaMax || t.difficolta <= this.filtro.difficoltaMax) &&
        (!this.filtro.durataMax || t.durataOre <= this.filtro.durataMax)
      )
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }

  apriPopupPrenotazione(id: number){
    this.idTrekkingPrenotazione = id;
    this.mostraAvvisoConferma = true;
  }

  aggiungitiAllUscita(){
    this.mostraAvvisoConferma = false;
    const token = sessionStorage.getItem('authToken');
    if (token && this.idTrekkingPrenotazione !== null) {
      this.prenotazioneService.addPartecipazione(this.idTrekkingPrenotazione, token).subscribe({
        next: () => {
          console.log('Trekking prenotato con successo!');
          this.idTrekkingPrenotazione = null;
          this.messaggioIscrizioneTrekking = "Iscritto correttamente al trekking!";
        }, 
        error: (err) =>{
          if (err.status === 401 && err.error === 'Token scaduto') {
            alert("Sessione scaduta. Effettua di nuovo il login.");
            sessionStorage.removeItem("token");
            this.router.navigate(['/login']);
          }
          console.error('Errore durante la prenotazione', err);
        }
      })
    }
  }


}
