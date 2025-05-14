import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private apiUrl = 'http://localhost:8080/api/user'

  // Questa variabile serve a notificare chi è loggato
  private utenteLoggatoSubject = new BehaviorSubject<string>(''); // nessuno all'inizio
  utenteLoggato$ = this.utenteLoggatoSubject.asObservable(); // sarà usato per ascoltare il login

  constructor(private http:HttpClient){}

  registrazione(utente: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, utente);
  }

  login(email: string, password: string): Observable<any> {
    const params = { email, password };
    return this.http.get(`${this.apiUrl}/login`, { params });
  }

    setUtenteLoggato(username: string) {
      this.utenteLoggatoSubject.next(username);
    }

    getUtenteAttuale(): string {
      return this.utenteLoggatoSubject.getValue();
    }

    logout() {
      this.utenteLoggatoSubject.next('');
    }
}
