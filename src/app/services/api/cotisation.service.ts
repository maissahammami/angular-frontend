import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cotisation } from '../../models/cotisation.model';
import { Facture } from 'app/models/adherent-process.model';

@Injectable({
  providedIn: 'root'
})
export class CotisationService {
  private apiUrl = 'api/Cotisations';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cotisation[]> {
    return this.http.get<Cotisation[]>(this.apiUrl);
  }

  getById(id: number): Observable<Cotisation> {
    return this.http.get<Cotisation>(`${this.apiUrl}/${id}`);
  }

  getByAdherent(adherentId: number): Observable<Cotisation[]> {
    return this.http.get<Cotisation[]>(`${this.apiUrl}/adherent/${adherentId}`);
  }

  deposerCotisation(id: number): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiUrl}/${id}/depose`, {});
  }
}

























// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Cotisation, Facture } from '../../models/cotisation.model';
// import { environment } from '../../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class CotisationService {
//   private apiUrl = `${environment.apiBaseUrl}/api/Cotisations`;

//   constructor(private http: HttpClient) { }

//   getAll(): Observable<Cotisation[]> {
//     return this.http.get<Cotisation[]>(this.apiUrl);
//   }

//   getById(id: number): Observable<Cotisation> {
//     return this.http.get<Cotisation>(`${this.apiUrl}/${id}`);
//   }

//   getByAdherent(adherentId: number): Observable<Cotisation[]> {
//     return this.http.get<Cotisation[]>(`${this.apiUrl}/adherent/${adherentId}`);
//   }

//   create(cotisation: Cotisation): Observable<Cotisation> {
//     return this.http.post<Cotisation>(this.apiUrl, cotisation);
//   }

//   update(id: number, cotisation: Cotisation): Observable<void> {
//     return this.http.put<void>(`${this.apiUrl}/${id}`, cotisation);
//   }

//   delete(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }

//   deposeCotisation(id: number): Observable<Facture> {
//     return this.http.post<Facture>(`${this.apiUrl}/${id}/depose`, {});
//   }
// }