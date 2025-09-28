export interface Agent {
  agentId: number;
  nom: string;
  email: string;
  dateCreation: Date;
  departement: string;
  estActif: boolean;
}

export enum TypeReclamation {
  VisiteControle = 1,
  ProblemePaiement = 2,
  ProblemeService = 3,
  ProblemeAdhesion = 4,
  Autre = 5
}

export enum StatutReclamation {
  Nouvelle = 1,
  EnCoursTraitement = 2,
  Terminee = 3,
  Rejetee = 4
}

export enum StatutVisiteControle {
  EnAttente = 1,
  Assignee = 2,
  Realisee = 3,
  Complete = 4
}
export enum RoleAgent {
  AgentStandard = 0,
  AgentSuperviseur = 1,
  Administrateur = 2
}