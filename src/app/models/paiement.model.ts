import { Data } from "@angular/router";

export interface Paiement {
  PaiementId?: number;
  Montant: number;
  Methode: number;
  DatePaiement: Data; // Change from Date to string
  FactureId: number;
  AdherentId: number;
}

export enum MethodePaiement {
  CarteBancaire = 0,
  Virement = 1,
  Especes = 2,
  Cheque = 3
}