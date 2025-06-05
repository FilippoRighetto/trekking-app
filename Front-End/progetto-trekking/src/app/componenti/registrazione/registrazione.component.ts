import { Component, OnInit } from '@angular/core';
import { UtenteService } from 'src/app/servizi/utente.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit{

  utente = {
    nome: '',
    cognome: '',
    username: '',
    email: '',
    password: '',
  };
  password = {
    pass: '',
    confPass: '',
  }
  erroreCredenziali: string = '';
  erroreGenerico: string = '';
  passwordVisibile: boolean = false;
  confermaPasswordVisibile: boolean = false;


  constructor(private utenteService: UtenteService, private router: Router){}


  ngOnInit(): void {}


  controllaCampiForm(){
    if(this.utente.nome && this.utente.cognome && this.utente.username && this.utente.email && this.password.pass && this.password.confPass){
      return false;
    }
    return true;
  }


  onSubmit(form: NgForm){
    this.erroreCredenziali = '';
    this.erroreGenerico = '';

    if (form.invalid) {
      this.erroreGenerico = "Compila correttamente tutti i campi!";
      return;
    }
    if (this.password.pass !== this.password.confPass) {
      this.erroreGenerico = "Le password non coincidono!";
      return;
    }

    const salt = '$2b$10$1234567890123456789012';                           
    const hashedPassword = bcrypt.hashSync(this.password.pass, salt);   //creazione della pass criptata
    this.utente.password = hashedPassword;

    this.utenteService.registrazione(this.utente).subscribe({
      next: (result: boolean) => {
        this.router.navigate(['/login'], { 
          state: {messaggioRegistrazione: 'Registrazione completata! Effettua il login.'}
        });
        form.resetForm();
      },
      error: (err) => {
        if (err.status === 401 && err.error === 'Token scaduto') {
          alert("Sessione scaduta. Effettua di nuovo il login.");
          sessionStorage.removeItem("token");
          this.router.navigate(['/login']);
        }

        console.error("Errore nella registrazione:", err);

        const backendMsg = err.error?.message;

        if (backendMsg) {
          if (backendMsg.includes("EMAIL_ESISTE")) {
            this.erroreCredenziali = "Email già in uso!";
          } else if (backendMsg.includes("USERNAME_ESISTE")) {
            this.erroreCredenziali = "Username già in uso!";
          } else if (backendMsg.includes("EMAIL_E_USERNAME_ESISTONO")) {
            this.erroreCredenziali = "Email e Username già in uso!";
          } else {
            this.erroreGenerico = "Errore generico nella registrazione.";
          }
        } else {
          this.erroreGenerico = "Errore imprevisto. Controlla la console.";
        }
      }
    });
  }

}
