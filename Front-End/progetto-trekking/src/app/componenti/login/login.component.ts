import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtenteService } from 'src/app/servizi/utente.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  utente = {
    email: '',
    password: '',
  };

  erroreGenerico: string = '';
  erroreEmailPass: string = '';
  loginEffettuato: string = '';

  constructor(private utenteService: UtenteService){}

  ngOnInit(): void {}

  controllaCampiForm(){
    if(this.utente.email && this.utente.password){
      return false;
    }
    return true;
  }

  onSubmit(form: NgForm){
    this.erroreGenerico = '';
    this.erroreEmailPass = '';
    this.loginEffettuato = '';

    this.utenteService.login(this.utente.email, this.utente.password).subscribe({
      next: response => {
        console.log("Login effettuato", response);
        this.loginEffettuato = "Login effettuato correttamente!";
      },
      error: (err) => {
        console.error("Errore in fase di login: ", err);

        const backendMsg = err.error?.message;

        if (backendMsg) {
          if (backendMsg.includes("1") || backendMsg.includes("2")) {
            this.erroreEmailPass = "Email o Password non corretta!";
          }else {
            this.erroreGenerico = "Errore generico in fase di login.";
          }
        } else {
          this.erroreGenerico = "Errore imprevisto. Controlla la console.";
        }
      }
    });
    
  }

}
