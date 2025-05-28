import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostTrekingServiceService } from 'src/app/servizi/post-treking-service.service';



@Component({
  selector: 'app-visualizza-treking-personali',
  templateUrl: './visualizza-treking-personali.component.html',
  styleUrls: ['./visualizza-treking-personali.component.css']
})
export class VisualizzaTrekingPersonaliComponent implements OnInit{
  
  
  mieiTrekking: any[] = [];
  messaggioRegistrazioneTrekking: string = '';
  mostraAvvisoConferma: boolean = false;
  idTrekkingDaCancellare: number | null = null;

  

  constructor(private postTrekingService: PostTrekingServiceService, private router: Router){}
  
  ngOnInit(): void {
      const state = history.state;
      if(state && state.messaggioRegistrazione){
        this.messaggioRegistrazioneTrekking = state.messaggioRegistrazione;

        //resetto lo stato history
        history.replaceState({}, document.title, this.router.url);
      }
      
      this.visualizzaTrekingPersonali();
  }

  visualizzaTrekingPersonali(){
    const token = sessionStorage.getItem('authToken');
    if(token){
      this.postTrekingService.getTrekkingPersonali(token).subscribe({
        next: (trekkingList) => {
          const oggi = new Date();
          oggi.setHours(0,0,0,0); // reset ora per confronto solo data

          // Separiamo trekking futuri e passati
          const futuri = trekkingList.filter(t => new Date(t.data) >= oggi);
          const passati = trekkingList.filter(t => new Date(t.data) < oggi);

          // Ordina futuri per data crescente (più vicino prima)
          futuri.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

          // Ordina passati per data decrescente (più recente prima)
          passati.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

          // Unisci i due array: futuri prima, poi passati
          this.mieiTrekking = [...futuri, ...passati];
        },
        error: (err) => {
          console.error('Errore nel recuperare i trekking personali', err);
        }
      });
    }
  }

  apriPopupConferma(id: number){
    this.idTrekkingDaCancellare = id;
    this.mostraAvvisoConferma = true;
  }

  cancellaPostTrekkingPersonale() {
    const token = sessionStorage.getItem('authToken');
    if (token && this.idTrekkingDaCancellare !== null) {
      this.postTrekingService.cancellaTrekkingPersonaliId(this.idTrekkingDaCancellare, token).subscribe({
        next: () => {
          console.log('Trekking cancellato con successo!');
          this.visualizzaTrekingPersonali();
          this.mostraAvvisoConferma = false;
          this.idTrekkingDaCancellare = null;
          this.messaggioRegistrazioneTrekking = "Tekking cancellato correttamente!";
        },
        error: (err) => {
          console.error('Errore durante la cancellazione', err);
        }
      });
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
