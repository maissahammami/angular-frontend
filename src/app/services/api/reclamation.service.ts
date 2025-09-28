import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reclamation } from '../../models/reclamation.model';
// import { DemandeContreVisite } from '../../models/demande-contre-visite.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  createReclamation(apiData: { Type: number; Description: any; }) {
      throw new Error('Method not implemented.');
  }
  private apiUrl = `${environment.apiBaseUrl}/api/Reclamations`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Reclamation[]>('getAll', [])));
  }

  getById(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<Reclamation>('getById')));
  }

  getByStatut(statut: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl}/statut/${statut}`)
      .pipe(catchError(this.handleError<Reclamation[]>('getByStatut', [])));
  }

create(reclamation: any): Observable<any> {
  return this.http.post<any>(
    `${this.apiUrl}`, // URL correcte : /api/Reclamations
    reclamation,
    this.httpOptions
  ).pipe(
    catchError(this.handleError<any>('create'))
  );
}
  update(id: number, reclamation: Reclamation): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, reclamation, this.httpOptions)
      .pipe(catchError(this.handleError<void>('update')));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<void>('delete')));
  }

  declencherReclamation(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/declenche`, {}, this.httpOptions)
      .pipe(catchError(this.handleError<any>('declencherReclamation')));
  }

  traiterReclamation(id: number, agentId: number): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.apiUrl}/${id}/traite/${agentId}`, {}, this.httpOptions)
      .pipe(catchError(this.handleError<Reclamation>('traiterReclamation')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      throw error;
    };
  }
}