import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteService } from 'src/app/servizi/utente.service';

@Component({
  selector: 'app-post-trekking',
  templateUrl: './post-trekking.component.html',
  styleUrls: ['./post-trekking.component.css']
})
export class PostTrekkingComponent implements OnInit{

  constructor(private utenteService: UtenteService, private router: Router ){}

  messaggioErrore: string = '';
  utenteLoggato: boolean = false;

  ngOnInit(): void {
    const utente = this.utenteService.getUtenteAttuale();
    if (!utente) {
      this.messaggioErrore = '⚠️ Devi prima loggarti per accedere a questa pagina.';
      localStorage.setItem('redirectAfterLogin', '/trekking');
      
      // Aspettiamo 2 secondi prima di reindirizzare
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.utenteLoggato = true;
    }
  }
}
