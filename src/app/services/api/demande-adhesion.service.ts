import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DemandeAdhesion } from '../../models/demande-adhesion.model';
import { Cotisation } from '../../models/cotisation.model';
import { catchError, map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemandeAdhesionService {
  private apiUrl = 'api/DemandesAdhesion';
  private useMock = false;

  constructor(private http: HttpClient) { }

  // Méthode de mapping corrigée SANS DOUBLONS
  private mapDemandes(data: any[]): DemandeAdhesion[] {
    return data.map(item => this.mapDemande(item));
  }

  private mapDemande(item: any): DemandeAdhesion {
    return {
      DemandeAdhesionId: item.demandeAdhesionId || item.DemandeAdhesionId,
      AdherentId: item.adherentId || item.AdherentId, // ← UNIQUEMENT AdherentId
      PlanSanteId: item.planSanteId || item.PlanSanteId,
      Statut: item.statut || item.Statut,
      DateCreation: item.dateCreation ? new Date(item.dateCreation) : 
                   item.dateDemande ? new Date(item.dateDemande) : new Date(),
      DateDemande: item.dateDemande ? new Date(item.dateDemande) : undefined,
      AgentId: item.agentId || item.AgentId,
      CotisationId: item.cotisationId || item.CotisationId,
      // Relations optionnelles
      Adherent: item.adherent || item.Adherent,
      PlanSante: item.planSante || item.PlanSante
    };
  }

  getAll(): Observable<DemandeAdhesion[]> {
    if (this.useMock) return this.getAllMock();
    
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => this.mapDemandes(data)),
      catchError(() => this.getAllMock())
    );
  }

  getById(id: number): Observable<DemandeAdhesion> {
    if (this.useMock) return this.getByIdMock(id);
    
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(data => this.mapDemande(data)),
      catchError(() => this.getByIdMock(id))
    );
  }

  getByStatut(statut: number): Observable<DemandeAdhesion[]> {
    if (this.useMock) return this.getByStatutMock(statut);
    
    return this.http.get<any[]>(`${this.apiUrl}/statut/${statut}`).pipe(
      map(data => this.mapDemandes(data)),
      catchError(() => this.getByStatutMock(statut))
    );
  }

  create(demande: DemandeAdhesion): Observable<DemandeAdhesion> {
    if (this.useMock) return this.createMock(demande);
    
    return this.http.post<DemandeAdhesion>(this.apiUrl, demande).pipe(
      catchError(() => this.createMock(demande))
    );
  }

  update(id: number, demande: DemandeAdhesion): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, demande);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  traiterDemande(id: number, agentId: number): Observable<DemandeAdhesion> {
    if (this.useMock) return this.traiterDemandeMock(id, agentId);
    
    return this.http.put<DemandeAdhesion>(`${this.apiUrl}/${id}/traite/${agentId}`, {}).pipe(
      catchError(() => this.traiterDemandeMock(id, agentId))
    );
  }

  calculerCotisation(id: number): Observable<Cotisation> {
    if (this.useMock) return this.calculerCotisationMock(id);
    
    return this.http.post<Cotisation>(`${this.apiUrl}/${id}/calcule-cotisation`, {}).pipe(
      catchError(() => this.calculerCotisationMock(id))
    );
  }

  // === MÉTHODES MOCK ===
  private getAllMock(): Observable<DemandeAdhesion[]> {
    const mockData: DemandeAdhesion[] = [
      {
        DemandeAdhesionId: 1,
        AdherentId: 1,
        PlanSanteId: 1,
        Statut: 0,
        DateCreation: new Date('2024-01-15'),
        AgentId: null,
        CotisationId: null
      },
      {
        DemandeAdhesionId: 2,
        AdherentId: 2,
        PlanSanteId: 2,
        Statut: 1,
        DateCreation: new Date('2024-01-16'),
        AgentId: 1,
        CotisationId: 1
      }
    ];
    
    return of(mockData).pipe(delay(500));
  }

  private getByIdMock(id: number): Observable<DemandeAdhesion> {
    const mockData: DemandeAdhesion = {
      DemandeAdhesionId: id,
      AdherentId: 1,
      PlanSanteId: 1,
      Statut: 0,
      DateCreation: new Date(),
      AgentId: null,
      CotisationId: null
    };
    
    return of(mockData).pipe(delay(300));
  }

  private getByStatutMock(statut: number): Observable<DemandeAdhesion[]> {
    return this.getAllMock().pipe(
      map(demandes => demandes.filter(d => d.Statut === statut))
    );
  }

  private createMock(demande: DemandeAdhesion): Observable<DemandeAdhesion> {
    const mockResponse: DemandeAdhesion = {
      ...demande,
      DemandeAdhesionId: Math.floor(Math.random() * 1000) + 1,
      DateCreation: new Date()
    };
    
    return of(mockResponse).pipe(delay(400));
  }

  private traiterDemandeMock(id: number, agentId: number): Observable<DemandeAdhesion> {
    const mockData: DemandeAdhesion = {
      DemandeAdhesionId: id,
      AdherentId: 1,
      PlanSanteId: 1,
      Statut: 1, // En cours traitement
      DateCreation: new Date(),
      AgentId: agentId,
      CotisationId: null
    };
    
    return of(mockData).pipe(delay(600));
  }

  private calculerCotisationMock(id: number): Observable<Cotisation> {
    const mockData: Cotisation = {
      CotisationId: 1,
      PrimeBrute: 200.0,
      PartEmployeur: 40.0,
      PartSalarie: 160.0,
      Periode: new Date(),
      AdherentId: 1,
      DemandeAdhesionId: id
    };
    
    return of(mockData).pipe(delay(600));
  }
}