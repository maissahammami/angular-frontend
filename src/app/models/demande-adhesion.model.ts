import { Adherent } from './adherent.model';
import { PlanSante } from './plan-sante.model';
import { Cotisation } from './cotisation.model';

export interface DemandeAdhesion {
  DemandeAdhesionId?: number;
  AdherentId: number;  // ← Ajoutez ce champ pour l'ID
  Statut: number;
  DateCreation: Date | string;  // Accepte les deux
  DateDemande?: Date | string;  // Accepte les deux
  PlanSanteId: number;
  AgentId?: number;
  CotisationId?: number;
  
  Adherent?: Adherent;
  PlanSante?: PlanSante;
  Cotisation?: Cotisation;
}

// Enums pour les statuts
export enum StatutAdhesion {
  EnAttente = 0,
  EnCoursTraitement = 1,
  Validee = 2,
  Rejetee = 3
}

export enum TypePlanSante {
  Basique = 1,
  Standard = 2,
  Premium = 3
}


















// export interface DemandeAdhesion {
//   DemandeAdhesionId?: number;
//   Statut: number;
//   DateDemande?: Date;
//   AdherentId: number;
//   PlanSanteId: number;
//   AgentId?: number;
//   CotisationId?: number;
//   Adherent?: any;
//   PlanSante?: any;
//   Agent?: any;
//   Cotisation?: any;
// }

// // Enum pour les statuts
// export enum StatutAdhesion {
//   EnAttente = 0,
//   EnCoursTraitement = 1,
//   Approuvee = 2,
//   Rejetee = 3
// }

// export const STATUT_LABELS: { [key: number]: string } = {
//   0: 'En Attente',
//   1: 'En Cours de Traitement',
//   2: 'Approuvée',
//   3: 'Rejetée'
// };