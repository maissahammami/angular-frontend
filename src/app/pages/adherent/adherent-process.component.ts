import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdherentProcessService } from '../../services/api/adherent-process.service';
import { AdherentService } from '../../services/api/adherent.service';
import { ReclamationService } from '../../services/api/reclamation.service'; // ← Ajoutez cette importation
import { EtapeProcess } from '../../models/adherent-process.model';
import { Adherent, NouvelAdherent } from '../../models/adherent.model';
import { PlanSante } from '../../models/plan-sante.model';
import { DemandeAdhesion } from '../../models/demande-adhesion.model';
import { Cotisation } from '../../models/cotisation.model';
import { Facture } from '../../models/adherent-process.model';
import { Paiement, MethodePaiement } from '../../models/paiement.model';
import { Reclamation } from '../../models/reclamation.model'; // ← Ajoutez cette importation

@Component({
  selector: 'app-adherent-process',
  templateUrl: './adherent-process.component.html',
  styleUrls: ['./adherent-process.component.scss']
})
export class AdherentProcessComponent implements OnInit {
  etapeActuelle: EtapeProcess = EtapeProcess.SelectionAdherent;
  EtapeProcess = EtapeProcess;
  showReclamationForm: boolean = false; // ← Ajoutez cette variable

  // Données
  plansSante: PlanSante[] = [];
  adherents: Adherent[] = [];
  demandeAdhesion: DemandeAdhesion | null = null;
  cotisation: Cotisation | null = null;
  facture: Facture | null = null;

  // Forms
  selectionForm: FormGroup;
  paiementForm: FormGroup;

  // États
  isLoading = false;
  erreur: string = '';
  modeCreationAdherent = false;

  // Enum pour le template
  MethodePaiement = MethodePaiement;

  constructor(
    private fb: FormBuilder,
    private adherentProcessService: AdherentProcessService,
    private adherentService: AdherentService,
    private reclamationService: ReclamationService, // ← Ajoutez cette injection
    private cdRef: ChangeDetectorRef
  ) {
    this.selectionForm = this.fb.group({
      adherentId: ['', Validators.required],
      planSanteId: ['', Validators.required]
    });

    this.paiementForm = this.fb.group({
      montant: ['', [Validators.required, Validators.min(0.01)]],
      methode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.chargerDonneesInitiales();
    
  }

  chargerDonneesInitiales(): void {
    this.isLoading = true;
    this.adherentProcessService.getInitialData().subscribe({
      next: (data) => {
        this.plansSante = data.plans;
        this.adherents = data.adherents;
        this.isLoading = false;
      },
      error: (error) => {
        this.erreur = 'Erreur lors du chargement des données';
        this.isLoading = false;
      }
    });
  }

  demarrerProcessus(): void {
    if (this.selectionForm.valid) {
      this.isLoading = true;
      const formData = this.selectionForm.value;

      const demande: DemandeAdhesion = {
        AdherentId: Number(formData.adherentId),
        PlanSanteId: Number(formData.planSanteId),
        Statut: 0,
      DateCreation: new Date(),  // ← Utilisez DateCreation
      DateDemande: new Date(),   // ← Optionnel        AgentId: null,
        CotisationId: null,
      };

      console.log('Envoi de la demande:', demande);

      this.adherentProcessService.createDemandeAdhesion(demande).subscribe({
        next: (demandeCreee) => {
          console.log('Réponse API - Demande créée:', demandeCreee);
          console.log('ID de la demande:', demandeCreee.DemandeAdhesionId);
          
          if (demandeCreee && demandeCreee.DemandeAdhesionId) {
            this.demandeAdhesion = demandeCreee;
            this.etapeActuelle = EtapeProcess.CalculCotisation;
            this.calculerCotisation();
          } else {
            this.erreur = 'L\'API n\'a pas retourné d\'ID valide pour la demande';
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error('Erreur API:', error);
          this.erreur = 'Erreur serveur: ' + error.message;
          this.isLoading = false;
        }
      });
    }
  }

  calculerCotisation(): void {
    console.log('Début calculCotisation, demandeAdhesion:', this.demandeAdhesion);
    
    if (!this.demandeAdhesion) {
      this.erreur = 'Erreur: Aucune demande d\'adhésion';
      this.isLoading = false;
      return;
    }
    
    if (!this.demandeAdhesion.DemandeAdhesionId) {
      this.erreur = 'Erreur: ID de demande manquant - ' + JSON.stringify(this.demandeAdhesion);
      this.isLoading = false;
      return;
    }

    console.log('Appel API avec ID:', this.demandeAdhesion.DemandeAdhesionId);
    
    this.adherentProcessService.calculerCotisation(this.demandeAdhesion.DemandeAdhesionId).subscribe({
      next: (cotisationCalculee) => {
        console.log('Cotisation calculée:', cotisationCalculee);
        this.cotisation = cotisationCalculee;
        this.etapeActuelle = EtapeProcess.GenerationFacture;
        this.genererFacture();
      },
      error: (error) => {
        console.error('Erreur calcul cotisation:', error);
        this.erreur = 'Erreur lors du calcul de la cotisation: ' + error.message;
        this.isLoading = false;
      }
    });
  }

  genererFacture(): void {
    console.log('Début genererFacture, cotisation:', this.cotisation);
    
    if (!this.cotisation) {
      this.erreur = 'Erreur: Aucune cotisation';
      this.isLoading = false;
      return;
    }
    
    if (!this.cotisation.CotisationId) {
      this.erreur = 'Erreur: ID de cotisation manquant - ' + JSON.stringify(this.cotisation);
      this.isLoading = false;
      return;
    }

    console.log('Appel API avec ID de cotisation:', this.cotisation.CotisationId);
    
    this.adherentProcessService.genererFacture(this.cotisation.CotisationId).subscribe({
      next: (factureGeneree) => {
        console.log('Facture générée:', factureGeneree);
        this.facture = factureGeneree;
        this.etapeActuelle = EtapeProcess.Paiement;
        this.paiementForm.patchValue({ montant: this.facture.Montant });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur génération facture:', error);
        this.erreur = 'Erreur lors de la génération de la facture: ' + error.message;
        this.isLoading = false;
      }
    });
  }

  effectuerPaiement(): void {
    if (this.paiementForm.valid) {
      this.isLoading = true;
      
      const adherentId = this.selectionForm.get('adherentId')?.value;
      
      const paiementData: Paiement = {
    Montant: this.facture!.Montant, // Montant complet de la facture
    Methode: 0, // Carte Bancaire par défaut
    AdherentId: Number(this.selectionForm.get('adherentId')?.value),
        DatePaiement: new Date(),
        FactureId: this.facture!.FactureId
      };

      console.log('Paiement envoyé:', paiementData);
      
      this.adherentProcessService.effectuerPaiement(this.facture!.FactureId, paiementData).subscribe({
        next: (resultatPaiement) => {
          console.log('Paiement effectué:', resultatPaiement);
          this.etapeActuelle = EtapeProcess.Reclamation; // ← Passe à l'étape réclamation
          this.isLoading = false;
          this.cdRef.detectChanges(); // ← Force la mise à jour de la vue

        },
        error: (error) => {
          console.error('Erreur paiement:', error);
          this.erreur = 'Erreur lors du paiement: ' + error.message;
          this.isLoading = false;
        }
      });
    }
  }
  // Ajoutez aussi cette méthode pour afficher le statut
getStatutFactureText(statut?: number): string {
  if (statut === undefined) return 'Inconnu';
  return statut === 0 ? 'Emise' : 
         statut === 1 ? 'Partiellement payée' : 
         statut === 2 ? 'Payée' : 'Inconnu';}
  

  // NOUVELLE MÉTHODE POUR LA RÉCLAMATION
onReclamationCree(reclamation: Reclamation): void {
  console.log('Réclamation créée:', reclamation);
  alert('Réclamation déposée avec succès !');
  
    // Passe automatiquement à la confirmation après dépôt
    setTimeout(() => {
      this.etapeActuelle = EtapeProcess.Confirmation;
      this.showReclamationForm = false;
    }, 1000);
  }

  passerAConfirmation(): void {
    this.etapeActuelle = EtapeProcess.Confirmation;
    this.showReclamationForm = false;
  }

  // // Option 1 : Passer automatiquement à la confirmation
  // this.etapeActuelle = EtapeProcess.Confirmation;
  
  // // Option 2 : Demander confirmation à l'utilisateur
  // const continuer = confirm('Réclamation déposée avec succès ! Souhaitez-vous terminer le processus ?');
  // if (continuer) {
  //   this.etapeActuelle = EtapeProcess.Confirmation;
  // }



  // Méthodes pour la création d'adhérent
  toggleModeCreation(): void {
    this.modeCreationAdherent = !this.modeCreationAdherent;
    if (this.modeCreationAdherent) {
      this.selectionForm.get('adherentId')?.reset();
    }
  }

  onAdherentCree(nouvelAdherent: NouvelAdherent): void {
    this.adherentService.createAdherent(nouvelAdherent).subscribe({
      next: (adherentCree) => {
        console.log('Adhérent créé:', adherentCree);
        this.loadAdherents();
        this.selectionForm.get('adherentId')?.setValue(adherentCree.AdherentId);
        this.modeCreationAdherent = false;
        this.erreur = '';
      },
      error: (error) => {
        console.error('Erreur création adhérent:', error);
        this.erreur = 'Erreur lors de la création: ' + error.message;
      }
    });
  }

  loadAdherents(): void {
    this.adherentProcessService.getAdherents().subscribe({
      next: (adherents) => {
        this.adherents = adherents;
      },
      error: (error) => {
        console.error('Erreur chargement adhérents:', error);
        this.erreur = 'Erreur lors du chargement des adhérents';
      }
    });
  }

  get adherentSelectionne(): Adherent | undefined {
    const adherentId = this.selectionForm.get('adherentId')?.value;
    return this.adherents.find(a => a.AdherentId == adherentId);
  }

  get planSelectionne(): PlanSante | undefined {
    const planId = this.selectionForm.get('planSanteId')?.value;
    return this.plansSante.find(p => p.PlanSanteId == planId);
  }

  recommencer(): void {
    this.etapeActuelle = EtapeProcess.SelectionAdherent;
    this.selectionForm.reset();
    this.paiementForm.reset();
    this.demandeAdhesion = null;
    this.cotisation = null;
    this.facture = null;
    this.erreur = '';
    this.modeCreationAdherent = false;
  }
}
