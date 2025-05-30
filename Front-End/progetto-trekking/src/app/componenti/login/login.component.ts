import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { UtenteService } from 'src/app/servizi/utente.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit{

  utente = {
    email: '',
    password: '',
    passwordCripted: '',
  };
  erroreGenerico: string = '';
  erroreEmailPass: string = '';
  messaggioRegistrazione: string = '';

  constructor(private utenteService: UtenteService, private router: Router){}

  ngOnInit(): void {
    const state = history.state;
    if(state && state.messaggioRegistrazione){
      this.messaggioRegistrazione = state.messaggioRegistrazione;
    }
  }

  controllaCampiForm(){
    if(this.utente.email && this.utente.password){
      return false;
    }
    return true;
  }

  onSubmit(){
    this.erroreGenerico = '';
    this.erroreEmailPass = '';

    const salt = '$2b$10$1234567890123456789012';                           
    const hashedPassword = bcrypt.hashSync(this.utente.password, salt);   //creazione della pass criptata
    this.utente.passwordCripted = hashedPassword;

    this.utenteService.login(this.utente.email, this.utente.passwordCripted).subscribe({
      next: token => {
        sessionStorage.setItem('authToken', token);
        this.notificaAppComponentLogin();

        const redirectPath = localStorage.getItem('redirectAfterLogin');
        if (redirectPath) {
          localStorage.removeItem('redirectAfterLogin');
          this.router.navigate([redirectPath]);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error("Errore in fase di login: ", err);

        const backendMsg = err.error;

        if (backendMsg) {
          if (backendMsg.includes("EMAIL_NON_TROVATA") || backendMsg.includes("PASSWORD_SBAGLIATA")) {
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

  notificaAppComponentLogin(){
    const token = sessionStorage.getItem('authToken');
    if (token) {                                              
      this.utenteService.getProfile(token).subscribe({
        next: (utente) => {
          this.utenteService.setUtente(utente);
        },
        error: (err) => {
          if (err.status === 401 && err.error === 'Token scaduto') {
            alert("Sessione scaduta. Effettua di nuovo il login.");
            sessionStorage.removeItem("token");
            this.router.navigate(['/login']);
          }
          
          console.error('Errore: ' + err);
        },
      });
    } else console.error('Token non presente in sessionStorage');
  }

}
