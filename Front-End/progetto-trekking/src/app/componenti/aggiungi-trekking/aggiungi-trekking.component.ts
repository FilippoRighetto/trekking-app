import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostTrekingServiceService } from 'src/app/servizi/post-treking-service.service';
import { Router } from '@angular/router';
import { transition } from '@angular/animations';




@Component({
  selector: 'app-aggiungi-trekking',
  templateUrl: './aggiungi-trekking.component.html',
  styleUrls: ['./aggiungi-trekking.component.css']
})
export class AggiungiTrekkingComponent implements OnInit{

  trekking = {
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
  ore: string[] = [];


  constructor(private postTrekingService: PostTrekingServiceService, private router: Router){}

  ngOnInit(): void {
    this.generaOre();
  }


  onSubmit(form: NgForm){
      if(form.valid){
          const trekkingDaInviare = {
              titolo: this.trekking.titolo,
              descrizione: this.trekking.descrizione,
              data: this.formattaData(this.trekking.data),       
              orario: this.formattaOra(this.trekking.orario),    
              luogo: this.trekking.luogo,
              puntoPartenza: this.trekking.puntoPartenza,
              difficolta: this.trekking.difficolta,
              durataOre: this.trekking.durataOre
              };
          const token = sessionStorage.getItem('authToken');
          if(token){
            this.postTrekingService.addTreking(trekkingDaInviare, token).subscribe({
                next: (result: boolean) => {
                    this.router.navigate(['/trekking/visualizzaPostPubblicati'], { 
                      state: {messaggioRegistrazione: 'Il treking "'+ trekkingDaInviare.titolo +'" è stato postato correttamente!'}
                    });
                    form.resetForm();
                },
                error: (err) => {
                    console.error("Errore in fase di registrazione del nuovo post treking:", err);
                }
            });
          }
      }else{
          this.erroreGenerico = "Compila correttamente tutti i campi!";
          return;
      }
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
