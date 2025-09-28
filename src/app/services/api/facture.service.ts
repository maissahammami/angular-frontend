import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../../models/adherent-process.model';
import { Paiement } from '../../models/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'api/Factures';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.apiUrl);
  }

  getById(id: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiUrl}/${id}`);
  }

  getByStatut(statut: number): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.apiUrl}/statut/${statut}`);
  }

  reglerFacture(id: number, paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(`${this.apiUrl}/${id}/regler`, paiement);
  }
}





























// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Facture, Paiement } from '../../models/cotisation.model';
// import { environment } from '../../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class FactureService {
//   private apiUrl = `${environment.apiBaseUrl}/api/Factures`;

//   constructor(private http: HttpClient) { }

//   getAll(): Observable<Facture[]> {
//     return this.http.get<Facture[]>(this.apiUrl);
//   }

//   getById(id: number): Observable<Facture> {
//     return this.http.get<Facture>(`${this.apiUrl}/${id}`);
//   }

//   getByStatut(statut: number): Observable<Facture[]> {
//     return this.http.get<Facture[]>(`${this.apiUrl}/statut/${statut}`);
//   }

//   create(facture: Facture): Observable<Facture> {
//     return this.http.post<Facture>(this.apiUrl, facture);
//   }

//   update(id: number, facture: Facture): Observable<void> {
//     return this.http.put<void>(`${this.apiUrl}/${id}`, facture);
//   }

//   delete(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }

//   reglerFacture(id: number, paiement: Paiement): Observable<Paiement> {
//     return this.http.post<Paiement>(`${this.apiUrl}/${id}/regler`, paiement);
//   }
// }