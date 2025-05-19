import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteService } from 'src/app/servizi/utente.service';

@Component({
  selector: 'app-post-trekking',
  templateUrl: './post-trekking.component.html',
  styleUrls: ['./post-trekking.component.css'],
})
export class PostTrekkingComponent implements OnInit {

  constructor(private utenteService: UtenteService, private router: Router) {}

  utenteLoggato: boolean = false;

  utente = {
    nome: '',
    cognome: '',
    username: '',
    email: '',
  };

  ngOnInit(): void {
    this.utenteService.utente$.subscribe((utente) => {
      if (utente) {
        this.utente = utente;
        this.utenteLoggato = true;
      }else{
        this.utenteLoggato = false;
      }

    });
  }

    vaiALogin() {
      localStorage.setItem('redirectAfterLogin', '/trekking');
      this.router.navigate(['/login']);
  }
}
