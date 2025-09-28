import { Routes } from '@angular/router';
import { AdherentProcessComponent } from './adherent-process.component';

export const AdherentRoutes: Routes = [
  { 
    path: '', 
    component: AdherentProcessComponent,
    data: { title: 'Processus Adhérent' }
  }
];