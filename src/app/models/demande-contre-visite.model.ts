export interface DemandeContreVisite {
  DemandeVisiteControleId: number;
  Motif: string;
  Statut: number;
  DateDemande: Date;
  ControleurMedicalId?: number;
  RapportMedicalId?: number;
  DateCreation: Date;
  ReclamationId: number;
  DateAssignation?: Date;



}

export enum StatutVisiteControle {
  EnAttente = 0,
  Assignee = 1,
  Planifiee = 2,
  Effectuee = 3,
  Complete = 4,
  Annulee = 5
}