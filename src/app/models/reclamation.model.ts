import { Agent } from "http";
import { Adherent } from "./adherent.model";
// import { DemandeContreVisite } from "./demande-contre-visite.model";

export interface Reclamation {
  ReclamationId?: number;
  Type: number;
  Statut: number;
  DateCreation: string;
  AdherentId: number;
  AgentId?: number;
  DemandeVisiteControleId?: number;
    // Description: string;
    // Adherent?: Adherent; 
    // Agent?: Agent;
    // DemandeVisiteControle?: DemandeContreVisite;
}
// Interface pour la création (sans ID)
export interface NouvelleReclamation {
  Type: number;
  Statut: number;
  DateCreation: string;
  AdherentId: number;
  AgentId?: number;
  DemandeVisiteControleId?: number;
}
export enum TypeReclamation {
  VisiteControle = 0,
  // ProblemePaiement = 1,
  ProblemeFacturation = 2,
  Autre = 3,
  ProblemeService,
  ProblemeAdhesion
}

export enum StatutReclamation {
  Nouvelle = 0,
  EnCoursTraitement = 1,
  Resolue = 2,
  Rejetee = 3,
  Terminee
}