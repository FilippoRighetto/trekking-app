import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostTrekingServiceService } from 'src/app/servizi/post-treking-service.service';


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

  constructor(private postTrekingService: PostTrekingServiceService, private router: Router){}
  

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


}
