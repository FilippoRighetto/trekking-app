import { Component, OnInit } from '@angular/core';
import { UtenteService } from 'src/app/servizi/utente.service';
import { NgForm } from '@angular/forms';

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

  erroreEmail: string = '';
  erroreUsername: string = '';
  erroreEmailUsername: string = '';
  erroreGenerico: string = '';

  successo: string = '';


  constructor(private utenteService: UtenteService){}

  ngOnInit(): void {}

  controllaCampiForm(){
    if(this.utente.nome && this.utente.cognome && this.utente.username && this.utente.email && this.utente.password){
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


    this.utenteService.registrazione(this.utente).subscribe({
      next: response => {
        console.log('Registrazione avvenuta con successo: ', response);
        this.successo = "Grazie per esserti registrato "  + this.utente.nome + " !";
        form.resetForm();
      },
      error: (err) => {
        console.error("Errore nella registrazione:", err);

        const backendMsg = err.error?.message;

        if (backendMsg) {
          if (backendMsg.includes("2")) {
            this.erroreEmail = "Email già in uso!";
          } else if (backendMsg.includes("3")) {
            this.erroreUsername = "Username già in uso!";
          } else if(backendMsg.includes("1"))
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
