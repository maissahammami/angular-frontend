import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adherent, NouvelAdherent } from '../../models/adherent.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {
  private apiUrl = `${environment.apiBaseUrl}/api/Adherents`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Adherent[]> {
    return this.http.get<Adherent[]>(this.apiUrl);
  }

  getById(id: number): Observable<Adherent> {
    return this.http.get<Adherent>(`${this.apiUrl}/${id}`);
  }

  getByMatricule(matricule: string): Observable<Adherent> {
    return this.http.get<Adherent>(`${this.apiUrl}/matricule/${matricule}`);
  }

  create(adherent: Adherent): Observable<Adherent> {
    return this.http.post<Adherent>(this.apiUrl, adherent);
  }

  update(id: number, adherent: Adherent): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, adherent);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  soumettreDemande(adherentId: number, demande: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${adherentId}/soumet-demande`, demande);
  }
    createAdherent(adherent: NouvelAdherent): Observable<Adherent> {
    return this.http.post<Adherent>(this.apiUrl, adherent);
  }
}