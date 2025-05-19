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

  confermaPassword: string = '';

  erroreEmail: string = '';
  erroreUsername: string = '';
  erroreEmailUsername: string = '';
  erroreGenerico: string = '';

  successo: string = '';


  constructor(private utenteService: UtenteService, private router: Router){}

  ngOnInit(): void {}

  controllaCampiForm(){
    if(this.utente.nome && this.utente.cognome && this.utente.username && this.utente.email && this.utente.password && this.confermaPassword){
      return false;
    }
    return true;
  }

  onSubmit(form: NgForm){
    this.erroreEmail = '';
    this.erroreUsername = '';
    this.erroreEmailUsername = '';
    this.erroreGenerico = '';
    this.successo = '';

    if (form.invalid) {
      this.erroreGenerico = "Compila correttamente tutti i campi!";
      return;
    }

    if (this.utente.password !== this.confermaPassword) {
      this.erroreGenerico = "Le password non coincidono!";
      return;
    }

    const salt = '$2b$10$1234567890123456789012';                           
    const hashedPassword = bcrypt.hashSync(this.utente.password, salt);   //creazione della pass criptata
    this.utente.password = hashedPassword;

    this.utenteService.registrazione(this.utente).subscribe({
      next: (result: boolean) => {
        if(result){

        }
        /*
        this.successo = "Grazie per esserti registrato "  + this.utente.nome + " !";
        sessionStorage.setItem('authToken', token);
        */
        this.router.navigate(['/login']);
        form.resetForm();
      },
      error: (err) => {
        console.error("Errore nella registrazione:", err);

        const backendMsg = err.error;

        if (backendMsg) {
          if (backendMsg.includes("EMAIL_ESISTE")) {
            this.erroreEmail = "Email già in uso!";
          } else if (backendMsg.includes("USERNAME_ESISTE")) {
            this.erroreUsername = "Username già in uso!";
          } else if(backendMsg.includes("EMAIL_E_USERNAME_ESISTONO"))
            this.erroreEmailUsername = "Email e Username già in uso!";
          else {
            this.erroreGenerico = "Errore generico nella registrazione.";
          }
        } else {
          this.erroreGenerico = "Errore imprevisto. Controlla la console.";
        }
      }
    });
  }

}
