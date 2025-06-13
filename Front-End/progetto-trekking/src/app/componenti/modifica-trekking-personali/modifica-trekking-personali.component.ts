import { Component, OnInit } from '@angular/core';
import { PostTrekingServiceService } from 'src/app/servizi/post-treking-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-modifica-trekking-personali',
  templateUrl: './modifica-trekking-personali.component.html',
  styleUrls: ['./modifica-trekking-personali.component.css']
})
export class ModificaTrekkingPersonaliComponent implements OnInit{
  
    trekking = {
      id: 0,
      titolo: '',
      descrizione: '',
      data: new Date(),
      orario: '',
      luogo: '',
      puntoPartenza: '',
      difficolta: 0,
      durataOre: '',
  }

  difficoltaOpzioni = [
    { valore: 1, descrizione: 'Facile' },
    { valore: 2, descrizione: 'Medio Facile' },
    { valore: 3, descrizione: 'Medio' },
    { valore: 4, descrizione: 'Medio Difficile' },
    { valore: 5, descrizione: 'Difficile' },
  ];

  erroreGenerico: string = '';
  dataMinima!: Date;
  ore: string[] = [];
  

constructor( private postTrekingService: PostTrekingServiceService, private router: Router, private route: ActivatedRoute){}
  
  
  ngOnInit(): void {
    this.generaOre();
    //imposto la data minima a domani
    this.dataMinima = new Date();
    this.dataMinima.setDate(this.dataMinima.getDate() + 1);
    this.dataMinima.setHours(0, 0, 0, 0);
    const token = sessionStorage.getItem('authToken');
    if(token){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.trekking.id = +id;
      this.postTrekingService.dammiTrekkingDaId(+id, token).subscribe(data => {
        if (data.orario) {
          data.orario = data.orario.substring(0, 5); // prende "08:30" da "08:30:00"
        }
        this.trekking = data;
      });
    }
  }
}

onSubmit(form: NgForm){
  const token = sessionStorage.getItem('authToken');
  if (!token) {
    this.erroreGenerico = 'Devi essere autenticato per modificare il trekking.';
    return;
  }

  // FORZA LA DATA A MEZZOGIORNO PER EVITARE PROBLEMI DI FUSO ORARIO
  const dataOriginale = this.trekking.data;
  this.trekking.data = new Date(
    dataOriginale.getFullYear(),
    dataOriginale.getMonth(),
    dataOriginale.getDate(),
    12, 0, 0
  );

  this.postTrekingService.modificaTrekking(this.trekking.id, this.trekking, token).subscribe({
    next: (success) => {
      if (success) {
        this.router.navigate(['/trekking/visualizzaPostPubblicati'],{
          state: {messaggioRegistrazione: 'Il trekking "'+ this.trekking.titolo +'" è stato modificato correttamente!'}
        }); 
      } else {
        this.erroreGenerico = 'Errore nella modifica del trekking.';
      }
    },
    error: (err) => {
      if (err.status === 401 && err.error === 'Token scaduto') {
        alert("Sessione scaduta. Effettua di nuovo il login.");
        sessionStorage.removeItem("token");
        this.router.navigate(['/login']);
      }

      this.erroreGenerico = 'Errore di connessione o autorizzazione.';
      console.error(err);
    }
  });
}


  controllaCampiForm(){
    if(this.trekking.titolo && this.trekking.descrizione && this.trekking.data && this.trekking.orario && this.trekking.luogo && this.trekking.puntoPartenza && this.trekking.difficolta && this.trekking.durataOre){
      return false;
    }
    return true;
  }

  generaOre() {
    for(let h = 0; h < 24; h++) {
      for(let m = 0; m < 60; m += 30) {
        this.ore.push(this.pad(h) + ':' + this.pad(m));
      }
    }
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  formattaData(data: Date): string {
    return data.toISOString().split('T')[0]; // "YYYY-MM-DD"
  }

  formattaOra(ora: string): string {
    return ora + ':00'; // "HH:mm:ss"
  }

}
