import { Routes } from '@angular/router';
import { AgentDashboardComponent } from './agent-dashboard.component';
import { AssignerMedecinComponent } from './assigner-medecin.component';
import { RapportMedicalComponent } from './rapport-medical.component';

export const AgentRoutes: Routes = [
  { path: '', component: AgentDashboardComponent },
  { path: 'assigner/:id', component: AssignerMedecinComponent },
  { path: 'rapport/:id', component: RapportMedicalComponent }
];