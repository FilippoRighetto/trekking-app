import { Component, OnInit } from '@angular/core';
import { UtenteService } from 'src/app/servizi/utente.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-modifica-credenziali',
  templateUrl: './modifica-credenziali.component.html',
  styleUrls: ['./modifica-credenziali.component.css']
})
export class ModificaCredenzialiComponent implements OnInit{

  utente = {
    nome: '',
    cognome: '',
    email: '',
    username: '',
    password: '',
  };
  password = {
    passwordAttuale: '',
    passwordAttualeCripted: '',
    nuovaPassword: '',
    confermaPassword:  '',
  };
  userError: string = '';
  emailError: string = '';

  modificaForm: boolean = false;
  erroreCredenziali: string = '';
  erroreGenerico: string = '';

  constructor(private utenteService: UtenteService, private router: Router){}

  ngOnInit(): void {
    this.aggiornaUtente();
  }

  onSubmit(form: NgForm){
    this.erroreCredenziali = '';
    this.erroreGenerico = '';
    this.userError = this.utente.username;
    this.emailError = this.utente.email;

    if (form.invalid) {
      this.erroreGenerico = "Compila correttamente tutti i campi!";
    return;
    }

    // Caso 1: solo alcuni campi della password sono compilati
    if (
      (this.password.passwordAttuale || this.password.nuovaPassword || this.password.confermaPassword) &&
      (!this.password.passwordAttuale || !this.password.nuovaPassword || !this.password.confermaPassword)
    ) {
      this.erroreGenerico = "Compila tutti i campi della password per modificarla.";
      return;
    }

    // Caso 2: tutti i campi sono compilati, ma le nuove password non coincidono
    if (
      this.password.passwordAttuale &&
      this.password.nuovaPassword &&
      this.password.confermaPassword &&
      this.password.nuovaPassword !== this.password.confermaPassword
    ) {
      this.erroreGenerico = "Le nuova password non coincide con quella di conferma.";
      return;
    }
    
    // Caso 3: tutti e 3 i campi password sono compilati e coincidono → esegui la criptazione
    if (
      this.password.passwordAttuale &&
      this.password.nuovaPassword &&
      this.password.confermaPassword &&
      this.password.nuovaPassword === this.password.confermaPassword
    ) {
      const salt = '$2b$10$1234567890123456789012';
      const hashedPassword = bcrypt.hashSync(this.password.nuovaPassword, salt);
      this.utente.password = hashedPassword;
      const hashedOldPassword = bcrypt.hashSync(this.password.passwordAttuale, salt);
      this.password.passwordAttualeCripted = hashedOldPassword;
    }
    console.log(this.utente, this.password.passwordAttualeCripted);

    const token = sessionStorage.getItem('authToken');
    if(token){
      this.utenteService.updateProfile(this.utente, token, this.password.passwordAttualeCripted).subscribe({
        next: (utente) => {
          console.log("Modifica effettuata");
          this.aggiornaUtente();
        },
        error: (err) => {

          if (err.status === 401 && err.error === 'Token scaduto') {
            alert("Sessione scaduta. Effettua di nuovo il login.");
            sessionStorage.removeItem("token");
            this.router.navigate(['/login']);
          }

          console.error("Errore backend completo:", err);
          const backendMsg = err.error?.message || err.error;

          if (typeof backendMsg === 'string') {
            if (backendMsg.includes("EMAIL_ESISTE")) {
              this.erroreCredenziali = "L'email " +this.emailError+ " è già in uso.";
            } else if (backendMsg.includes("USERNAME_ESISTE")) {
              this.erroreCredenziali = "L'username " +this.userError+ " è già in uso.";
            }else if(backendMsg.includes("EMAIL_E_USERNAME_ESISTONO")){
              this.erroreCredenziali = "L'username " +this.userError+ " e l'email " +this.emailError+ " sono già in uso.";
            }else if (backendMsg.includes("PASSWORD_ATTUALE_ERRATA")) {
              this.erroreCredenziali = "La password attuale è errata.";
            } else {
              this.erroreGenerico = "Si è verificato un errore durante l'aggiornamento del profilo.";
            }
          } else {
            this.erroreGenerico = "Errore imprevisto. Controlla la console per maggiori dettagli.";
          }
          this.aggiornaUtente();
        }
      });
    }
  }

  aggiornaUtente(){
      const token = sessionStorage.getItem('authToken');
    if(token){
      this.utenteService.getProfile(token).subscribe({
        next: (utente) => {
          this.utente = utente;
        },
        error: (err) =>{
          if (err.status === 401 && err.error === 'Token scaduto') {
            alert("Sessione scaduta. Effettua di nuovo il login.");
            sessionStorage.removeItem("token");
            this.router.navigate(['/login']);
          }
          console.log('Errore nel recuperare il profilo: ', err);
        },
      });
    }
  }

  apriChiudiModificaForm(){
    this.modificaForm==true ? this.modificaForm=false : this.modificaForm=true;
  }



}
