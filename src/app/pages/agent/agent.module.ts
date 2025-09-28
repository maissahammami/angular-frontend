import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgentDashboardComponent } from './agent-dashboard.component';
import { AssignerMedecinComponent } from './assigner-medecin.component';
import { RapportMedicalComponent } from './rapport-medical.component';
import { AgentRoutes } from './agent.routing';

@NgModule({
  declarations: [
    AgentDashboardComponent,
    AssignerMedecinComponent,
    RapportMedicalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AgentRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgentModule { }