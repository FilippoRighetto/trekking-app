import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private apiUrl = 'http://localhost:8080/api/user'

  constructor(private http:HttpClient){}

  registrazione(utente: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, utente);
  }

login(email: string, password: string): Observable<any> {
  const params = { email, password };
  return this.http.get(`${this.apiUrl}/login`, { params });
}
}
