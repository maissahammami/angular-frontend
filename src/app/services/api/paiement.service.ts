import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Paiement } from '../../models/cotisation.model';
import { Paiement } from '../../models/paiement.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = `${environment.apiBaseUrl}/api/Paiements`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.apiUrl);
  }

  getById(id: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/${id}`);
  }

  getByAdherent(adherentId: number): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.apiUrl}/adherent/${adherentId}`);
  }

  create(paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(this.apiUrl, paiement);
  }

  update(id: number, paiement: Paiement): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, paiement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}