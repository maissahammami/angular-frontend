import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MedecinControle } from '../../models/medecin-controle.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedecinControleService {
  private apiUrl = `${environment.apiBaseUrl}/api/MedecinsControle`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<MedecinControle[]> {
    return this.http.get<MedecinControle[]>(this.apiUrl)
      .pipe(catchError(this.handleError<MedecinControle[]>('getAll', [])));
  }

  getBySpecialite(specialite: string): Observable<MedecinControle[]> {
    return this.http.get<MedecinControle[]>(`${this.apiUrl}/specialite/${specialite}`)
      .pipe(catchError(this.handleError<MedecinControle[]>('getBySpecialite', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      throw error;
    };
  }
}