import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private apiUrl = 'http://localhost:8080/api/user'

  private utenteSubject = new BehaviorSubject<any>(null); // è un tipo speciale di subject  che mantiene sempre l'ultimo valore emesso. Quando un nuovo subscriber si iscrive, riceve subito l’ultimo valore. Serve a tenere in memoria uno stato dove altri componenti si possono iscrivere e ricevere in tempo reale gli aggiornamenti quando lo stato cambia.
  utente$: Observable<any> = this.utenteSubject.asObservable(); // observable per ascoltare i cambiamenti

  constructor(private http:HttpClient){}

  registrazione(utente: any): Observable<boolean>{
    return this.http.post<boolean>('http://localhost:8080/api/user/register', utente);
  }

  login(email: string, password: string): Observable<any> {
    const params = { email, password };
    return this.http.get(`${this.apiUrl}/login`, { params, responseType: 'text'});
  }

  logout(token: string): Observable<string> {  
  const headers = { 'Authorization': token };  // Passa il token nell'header Authorization
  return this.http.delete<string>(`${this.apiUrl}/logout`, { headers, responseType: 'text' as 'json' });

  }

  getProfile(token: string): Observable<any>{
    const headers = {'Authorization': token};
    return this.http.get(`${this.apiUrl}/profile`, { headers, responseType: 'json' });
  }

  updateProfile(updatedUser: any, token: string, passwordAttuale: string): Observable<any> {
    const headers = { 'Authorization': token };
    const params = {passwordAttuale};
    return this.http.put<any>(`${this.apiUrl}/profile`, updatedUser, { headers, params, responseType: 'json' });
  }

  setUtente(utente: any){
    this.utenteSubject.next(utente);
  }

  clearUtente(){
    this.utenteSubject.next(null);
  }


}
