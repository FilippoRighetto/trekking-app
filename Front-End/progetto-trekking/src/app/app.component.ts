import { Component, OnInit } from '@angular/core';
import { UtenteService } from './servizi/utente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'progetto-trekking';

  utente = {
    nome: '',
    cognome: '',
    username: '',
    email: '',
  };

  constructor(private utenteService: UtenteService, private router: Router) {}

  ngOnInit(): void {
    this.utenteService.utente$.subscribe((utente) => {
      if (utente) {
        this.utente = utente;
      }
    });

    const token = sessionStorage.getItem('authToken');
    if (token) {
      //perchè token non può essere null, quindi dava errore
      this.utenteService.getProfile(token).subscribe({
        next: (utente) => {
          this.utenteService.setUtente(utente);
        },
        error: (err) => {
          console.error('Errore nel recuperare il profilo:', err);
        },
      });
    }
  }

  logout() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      this.utenteService.logout(token).subscribe({
        next: () => {
          this.utente.nome = '';
          this.utente.cognome = '';
          this.utente.username = '';
          this.utente.email = '';
          sessionStorage.removeItem('authToken');
          this.router.navigate(['/']);
        },
          error: (err) => {
            console.error('Errore nel logout:', err);
            alert(JSON.stringify(err));
          }
      });
    }
  }
}
