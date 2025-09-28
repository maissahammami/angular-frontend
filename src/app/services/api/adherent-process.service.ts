import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
// import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
// Importez vos modèles (important pour le typage fort)
import { Adherent } from '../../models/adherent.model';
import { PlanSante } from '../../models/plan-sante.model';
import { DemandeAdhesion } from '../../models/demande-adhesion.model';
import { Cotisation } from '../../models/cotisation.model';
import { Facture } from '../../models/adherent-process.model';
import { Paiement } from '../../models/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class AdherentProcessService {
    private baseUrl = environment.apiBaseUrl + '/api';
  constructor(private http: HttpClient) { }

  // Méthodes pour récupérer les données avec typage fort
  getPlansSante(): Observable<PlanSante[]> {
    return this.http.get<PlanSante[]>(`${this.baseUrl}/PlansSante`)
      .pipe(
        catchError(this.handleError<PlanSante[]>('getPlansSante', []))
      );
  }

  getAdherents(): Observable<Adherent[]> {
    return this.http.get<Adherent[]>(`${this.baseUrl}/Adherents`)
      .pipe(
        catchError(this.handleError<Adherent[]>('getAdherents', []))
      );
  }

  // Méthodes pour le processus complet avec typage
  createDemandeAdhesion(demande: DemandeAdhesion): Observable<DemandeAdhesion> {
    return this.http.post<DemandeAdhesion>(`${this.baseUrl}/DemandesAdhesion`, demande)
      .pipe(
        catchError(this.handleError<DemandeAdhesion>('createDemandeAdhesion'))
      );
  }

  calculerCotisation(demandeId: number): Observable<Cotisation> {
    return this.http.post<Cotisation>(
      `${this.baseUrl}/DemandesAdhesion/${demandeId}/calcule-cotisation`, 
      {}
    ).pipe(
      catchError(this.handleError<Cotisation>('calculerCotisation'))
    );
  }

  genererFacture(cotisationId: number): Observable<Facture> {
    return this.http.post<Facture>(
      `${this.baseUrl}/Cotisations/${cotisationId}/depose`, 
      {}
    ).pipe(
      catchError(this.handleError<Facture>('genererFacture'))
    );
  }

effectuerPaiement(factureId: number, paiement: Paiement): Observable<Paiement> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  return this.http.post<Paiement>(
    `${this.baseUrl}/Factures/${factureId}/regler`, 
    paiement,
    httpOptions
  ).pipe(
    catchError(this.handleError<Paiement>('effectuerPaiement'))
  );
}

  // Méthode pour récupérer toutes les données initiales
  getInitialData(): Observable<{plans: PlanSante[], adherents: Adherent[]}> {
    return forkJoin({
      plans: this.getPlansSante(),
      adherents: this.getAdherents()
    });
  }

  // Gestionnaire d'erreurs centralisé
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      // Vous pouvez aussi envoyer l'erreur à un service de logging
      throw error; // Propagez l'erreur pour que le composant puisse la gérer
    };
  }
}