import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdherentFormComponent } from './adherent-form.component'; // ← Ajoutez
import { ReclamationFormComponent } from './reclamation-form.component'; // ← Assurez-vous que c'est importé

import { AdherentProcessComponent } from './adherent-process.component';
import { AdherentRoutes } from './adherent.routing';

@NgModule({
  declarations: [
    AdherentProcessComponent,
    AdherentFormComponent,
    ReclamationFormComponent  // ← Déclarez le composant ici 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdherentRoutes), // ✅ Important: forChild() pour les modules feature
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AdherentProcessComponent
  ]
})
export class AdherentModule { }