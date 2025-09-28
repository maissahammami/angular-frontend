import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanSante } from '../../models/plan-sante.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanSanteService {
  private apiUrl = `${environment.apiBaseUrl}/api/PlansSante`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<PlanSante[]> {
    return this.http.get<PlanSante[]>(this.apiUrl);
  }

  getById(id: number): Observable<PlanSante> {
    return this.http.get<PlanSante>(`${this.apiUrl}/${id}`);
  }
}