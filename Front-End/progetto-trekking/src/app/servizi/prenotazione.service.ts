import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  private apiUrlPrenotazione = 'http://localhost:8083/api/partecipazione'

  constructor(private http:HttpClient){}
  

  addPartecipazione(id: number, token: string): Observable<any>{
    const headers = { 'Authorization': token };
    return this.http.post<any>(`${this.apiUrlPrenotazione}/partecipa/${id}`, {}, { headers });
  }

  disiscriviPartecipazione(id: number, token: string): Observable<any> {
    const headers = { 'Authorization': token };
    return this.http.delete<any>(`${this.apiUrlPrenotazione}/disiscriviti/${id}`, { headers });
  }

  dammiPrenotazioni(token: string): Observable<any[]> {
    const headers = { 'Authorization': token };
    return this.http.get<any[]>(`${this.apiUrlPrenotazione}/visualizzaPrenotazioni`, { headers });
  }

}
