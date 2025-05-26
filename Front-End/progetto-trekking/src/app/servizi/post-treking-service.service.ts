import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostTrekingServiceService {

  private apiUrlPostTreking = 'http://localhost:8082/api/trekking'

  constructor(private http:HttpClient){}
  
  addTreking(treking: any, token: string): Observable<any>{
    const headers = { 'Authorization': token };
    return this.http.post<any>(`${this.apiUrlPostTreking}/aggiungi`, treking, { headers, responseType: 'json' });
  }

  getTrekkingPersonali(token: string): Observable<any[]> {
    const headers = { 'Authorization': token };
    return this.http.get<any[]>(`${this.apiUrlPostTreking}/visualizzaMiei`, { headers });
  }

  cancellaTrekkingPersonaliId(id: number, token: string): Observable<any>{
    const headers = { 'Authorization': token };
    return this.http.delete<any>(`${this.apiUrlPostTreking}/cancella/${id}`, { headers });
  }

  dammiTrekkingDaId(id: number, token: string): Observable<any> {
    const headers = { 'Authorization': token };
    return this.http.get<any>(`${this.apiUrlPostTreking}/visualizzaSingolo/${id}`, { headers });
  }

  modificaTrekking(id: number, trekking: any, token: string): Observable<boolean> {
    const headers = { 'Authorization': token };
    return this.http.put<boolean>(`${this.apiUrlPostTreking}/modifica/${id}`, trekking, { headers });
  }

  dammiTuttiTrekking(token: string): Observable<any[]> {
    const headers = { 'Authorization': token };
    return this.http.get<any[]>(`${this.apiUrlPostTreking}/visualizzaTutti`, { headers });
  }



}
