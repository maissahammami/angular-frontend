export interface Cotisation {
  CotisationId: number;
  PrimeBrute: number;
  PartEmployeur: number;
  PartSalarie: number;
  Periode: Date;
  AdherentId: number;
  DemandeAdhesionId?: number;
}




















// export interface Cotisation {
//   CotisationId?: number;
//   PrimeBrute: number;
//   PartEmployeur: number;
//   PartSalarie: number;
//   Periode: Date;
//   AdherentId: number;
//   DemandeAdhesionId?: number;
//   Adherent?: any;
//   DemandeAdhesion?: any;
//   Facture?: any;
// }

// export interface Facture {
//   FactureId?: number;
//   Numero: string;
//   Montant: number;
//   Statut: number;
//   DateEmission: Date;
//   DateEcheance?: Date;
//   CotisationId: number;
//   Cotisation?: any;
//   Paiements?: Paiement[];
// }

// export interface Paiement {
//   PaiementId?: number;
//   Montant: number;
//   Methode: number; // Changé de modePaiement à methode
//   DatePaiement: Date;
//   FactureId: number;
//   AdherentId: number;
//   Facture?: any;
//   Adherent?: any;
// }

// // Enums
// export enum StatutFacture {
//   Emise = 0,
//   PartiellementReglee = 1,
//   Reglee = 2,
//   Annulee = 3
// }

// export enum MethodePaiement {
//   CarteBancaire = 0,
//   Virement = 1,
//   Cheque = 2,
//   Especes = 3,
//   Prelevement = 4
// }

// export const STATUT_FACTURE_LABELS: { [key: number]: string } = {
//   0: 'Emise',
//   1: 'Partiellement Réglée',
//   2: 'Réglée',
//   3: 'Annulée'
// };

// export const METHODE_PAIEMENT_LABELS: { [key: number]: string } = {
//   0: 'Carte Bancaire',
//   1: 'Virement',
//   2: 'Chèque',
//   3: 'Espèces',
//   4: 'Prélèvement'
// };

// export const METHODES_PAIEMENT = [
//   { value: 0, label: 'Carte Bancaire' },
//   { value: 1, label: 'Virement' },
//   { value: 2, label: 'Chèque' },
//   { value: 3, label: 'Espèces' },
//   { value: 4, label: 'Prélèvement' }
// ];