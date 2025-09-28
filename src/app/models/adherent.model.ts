export interface Adherent {
  AdherentId?: number;
  Prenom: string;
  Nom: string;
  Email: string;
  Telephone?: string;
  DateInscription: Date;
  PasswordHash?: string;
  DemandesAdhesion?: any[];
  Reclamations?: any[];
  Cotisations?: any[];
  Paiements?: any[];
}

export interface AdherentFormData {
  Prenom: string;
  Nom: string;
  Email: string;
  Telephone?: string;
  DateInscription: Date;
}
export interface NouvelAdherent {
  Prenom: string;
  Nom: string;
  Email: string;
  Telephone: string;
  DateNaissance: Date;
  DateInscription: Date;
  // DateInscription sera générée par le backend
}