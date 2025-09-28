import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { DemandeContreVisite } from '../../models/demande-contre-visite.model';
import { RapportMedical } from '../../models/rapport-medical.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeContreVisiteService {
  private apiUrl = `${environment.apiBaseUrl}/api/DemandesContreVisite`;
  private useMock = false; // ← PASSEZ À FALSE pour utiliser le vrai backend

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // === MÉTHODES PRINCIPALES ===

  getAll(): Observable<DemandeContreVisite[]> {
    if (this.useMock) {
      return this.getAllMock();
    }
    
    return this.http.get<DemandeContreVisite[]>(this.apiUrl, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('❌ Erreur getAll, passage en mode mock:', error);
          return this.getAllMock();
        })
      );
  }

  getById(id: number): Observable<DemandeContreVisite> {
    if (this.useMock) {
      return this.getByIdMock(id);
    }
    
    return this.http.get<DemandeContreVisite>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('❌ Erreur getById, passage en mode mock:', error);
          return this.getByIdMock(id);
        })
      );
  }

  getByStatut(statut: number): Observable<DemandeContreVisite[]> {
    if (this.useMock) {
      return this.getByStatutMock(statut);
    }
    
    return this.http.get<DemandeContreVisite[]>(`${this.apiUrl}/statut/${statut}`, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('❌ Erreur getByStatut, passage en mode mock:', error);
          return this.getByStatutMock(statut);
        })
      );
  }

  assignerAControleur(id: number, controleurId: number): Observable<DemandeContreVisite> {
    // MODE RÉEL - Utilise l'URL exacte du backend
    if (!this.useMock) {
      // URL EXACTE comme dans le backend : {id}/assigner/{controleurId}
      const url = `${this.apiUrl}/${id}/assigner/${controleurId}`;
      console.log('🌐 Appel RÉEL vers backend:', url);
      
      // Body vide comme attendu par le backend
      return this.http.post<DemandeContreVisite>(url, {}, this.httpOptions).pipe(
        catchError((error) => {
          console.error('❌ Erreur backend, passage en mode mock:', error);
          return this.assignerMock(id, controleurId);
        })
      );
    }

    // Mode mock de secours
    return this.assignerMock(id, controleurId);
  }

  aboutitRapportMedical(id: number, rapport: RapportMedical): Observable<RapportMedical> {
    if (this.useMock) {
      return this.aboutitRapportMedicalMock(id, rapport);
    }
    
    return this.http.post<RapportMedical>(
      `${this.apiUrl}/${id}/aboutit-rapport`, 
      rapport,
      this.httpOptions
    ).pipe(
      catchError((error) => {
        console.error('❌ Erreur aboutitRapportMedical, passage en mode mock:', error);
        return this.aboutitRapportMedicalMock(id, rapport);
      })
    );
  }

  create(demande: DemandeContreVisite): Observable<DemandeContreVisite> {
    if (this.useMock) {
      return this.createMock(demande);
    }
    
    return this.http.post<DemandeContreVisite>(this.apiUrl, demande, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('❌ Erreur create, passage en mode mock:', error);
          return this.createMock(demande);
        })
      );
  }

  update(id: number, demande: DemandeContreVisite): Observable<any> {
    if (this.useMock) {
      return this.updateMock(id, demande);
    }
    
    return this.http.put(`${this.apiUrl}/${id}`, demande, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('❌ Erreur update, passage en mode mock:', error);
          return this.updateMock(id, demande);
        })
      );
  }

  delete(id: number): Observable<any> {
    if (this.useMock) {
      return this.deleteMock(id);
    }
    
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('❌ Erreur delete, passage en mode mock:', error);
          return this.deleteMock(id);
        })
      );
  }

  // === MÉTHODES MOCK ===

  private assignerMock(id: number, controleurId: number): Observable<DemandeContreVisite> {
    console.log('🔄 Mode MOCK activé pour assignerAControleur');
    
    const mockResponse: DemandeContreVisite = {
      DemandeVisiteControleId: id,
      ControleurMedicalId: controleurId,
      DateCreation: new Date(),
      DateAssignation: new Date(),
      Statut: 1, // Assignée
      ReclamationId: 0 // Valeur par défaut
      ,
      Motif: '',
      DateDemande: undefined
    };

    return of(mockResponse).pipe(delay(800));
  }

  private getAllMock(): Observable<DemandeContreVisite[]> {
    const mockData: DemandeContreVisite[] = [
      {
        DemandeVisiteControleId: 1,
        ControleurMedicalId: 1,
        DateCreation: new Date('2024-01-15'),
        Statut: 1,
        ReclamationId: 1,
        Motif: '',
        DateDemande: undefined
      },
      {
        DemandeVisiteControleId: 2,
        ControleurMedicalId: 2,
        DateCreation: new Date('2024-01-16'),
        Statut: 0,
        ReclamationId: 2,
        Motif: '',
        DateDemande: undefined
      }
    ];
    
    return of(mockData).pipe(delay(500));
  }

  private getByIdMock(id: number): Observable<DemandeContreVisite> {
    const mockData: DemandeContreVisite = {
      DemandeVisiteControleId: id,
      ControleurMedicalId: 1,
      DateCreation: new Date(),
      Statut: 1,
      ReclamationId: id,
      Motif: '',
      DateDemande: undefined
    };
    
    return of(mockData).pipe(delay(300));
  }

  private getByStatutMock(statut: number): Observable<DemandeContreVisite[]> {
    const mockData: DemandeContreVisite[] = [
      {
        DemandeVisiteControleId: 1,
        ControleurMedicalId: 1,
        DateCreation: new Date(),
        Statut: statut,
        ReclamationId: 1,
        Motif: '',
        DateDemande: undefined
      }
    ];
    
    return of(mockData).pipe(delay(400));
  }

  private aboutitRapportMedicalMock(id: number, rapport: RapportMedical): Observable<RapportMedical> {
    const mockResponse: RapportMedical = {
      ...rapport,
      RapportMedicalId: 1,
      DemandeVisiteControleId: id,
      DateCreation: new Date()
    };
    
    return of(mockResponse).pipe(delay(600));
  }

  private createMock(demande: DemandeContreVisite): Observable<DemandeContreVisite> {
    const mockResponse: DemandeContreVisite = {
      ...demande,
      DemandeVisiteControleId: Math.floor(Math.random() * 1000) + 1,
      DateCreation: new Date()
    };
    
    return of(mockResponse).pipe(delay(500));
  }

  private updateMock(id: number, demande: DemandeContreVisite): Observable<any> {
    return of({ success: true }).pipe(delay(400));
  }

  private deleteMock(id: number): Observable<any> {
    return of({ success: true }).pipe(delay(300));
  }

  // === MÉTHODE UTILITAIRE ===
  
  testBackendConnection(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/test-connection`).pipe(
      catchError(() => of(false))
    );
  }
}