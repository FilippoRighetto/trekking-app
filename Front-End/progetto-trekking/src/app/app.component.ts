import { Component, OnInit } from '@angular/core';
import { UtenteService } from './servizi/utente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'progetto-trekking';

  userLogged: string = '';

  constructor(private utenteService: UtenteService, private router: Router){}

  ngOnInit(): void {
    this.utenteService.utenteLoggato$.subscribe(username => {this.userLogged = username});
  }

  logout() {
  this.utenteService.logout();
  this.userLogged = '';
  this.router.navigate(['/']);
}

}
