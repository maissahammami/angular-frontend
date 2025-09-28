import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RapportMedical } from '../../models/rapport-medical.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RapportMedicalService {
  private apiUrl = `${environment.apiBaseUrl}/api/RapportsMedical`;

  constructor(private http: HttpClient) { }

  getByMedecin(medecinId: number): Observable<RapportMedical[]> {
    return this.http.get<RapportMedical[]>(`${this.apiUrl}/medecin/${medecinId}`)
      .pipe(catchError(this.handleError<RapportMedical[]>('getByMedecin', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      throw error;
    };
  }
}