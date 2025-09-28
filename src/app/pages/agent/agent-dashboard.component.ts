// agent-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/api/reclamation.service';
import { DemandeAdhesionService } from '../../services/api/demande-adhesion.service';
import { Reclamation, StatutReclamation, TypeReclamation } from '../../models/reclamation.model';
import { DemandeAdhesion } from '../../models/demande-adhesion.model';
import { StatutAdhesion } from '../../models/demande-adhesion.model';
import { TypePlanSante } from '../../models/demande-adhesion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.scss']
})
export class AgentDashboardComponent implements OnInit {
  reclamations: Reclamation[] = [];
  demandesAdhesion: DemandeAdhesion[] = [];
  demandesFiltrees: DemandeAdhesion[] = []; // Demandes filtrées
  isLoading = false;
  activeTab: 'reclamations' | 'adhesions' = 'reclamations';
  filtreStatut: number | null = null; // Filtre par statut


  constructor(
    private reclamationService: ReclamationService,
    private demandeAdhesionService: DemandeAdhesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadReclamations();
    this.loadDemandesAdhesion();
  }

  loadReclamations(): void {
    this.isLoading = true;
    this.reclamationService.getAll().subscribe({
      next: (data) => {
        this.reclamations = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur chargement réclamations:', error);
        this.isLoading = false;
      }
    });
  }

// agent-dashboard.component.ts
loadDemandesAdhesion(): void {
  this.isLoading = true;
  this.demandeAdhesionService.getAll().subscribe({
    next: (data) => {
      console.log('📦 Données reçues du backend:', data);
      this.demandesAdhesion = data;
      this.appliquerFiltre();
      this.isLoading = false;
      console.log('✅ Demandes après mapping:', this.demandesAdhesion);
    },
    error: (error) => {
      console.error('❌ Erreur chargement demandes adhésion:', error);
      console.error('Détails erreur:', {
        status: error.status,
        message: error.message,
        url: error.url
      });
      this.isLoading = false;
    }
  });
}

  appliquerFiltre(): void {
    if (this.filtreStatut === null) {
      this.demandesFiltrees = this.demandesAdhesion;
    } else {
      this.demandesFiltrees = this.demandesAdhesion.filter(
        demande => demande.Statut === this.filtreStatut
      );
    }
  }

  filtrerParStatut(statut: number | null): void {
    this.filtreStatut = statut;
    this.appliquerFiltre();
  }

  // Méthode pour obtenir le nombre de demandes par statut
  getNombreDemandesParStatut(statut: number): number {
    return this.demandesAdhesion.filter(d => d.Statut === statut).length;
  }


  getStatutText(statut: number): string {
    return StatutReclamation[statut] || 'Inconnu';
  }

  getTypeText(type: number): string {
    return TypeReclamation[type] || 'Inconnu';
  }

  getStatutAdhesionText(statut: number): string {
    return StatutAdhesion[statut] || 'Inconnu';
  }

  getPlanSanteText(planId: number): string {
    return TypePlanSante[planId] || 'Inconnu';
  }

  traiterReclamation(reclamationId: number): void {
    this.router.navigate(['/agent/assigner', reclamationId]);
  }

  traiterDemandeAdhesion(demandeId: number): void {
    const agentId = 1; // À remplacer par l'ID de l'agent connecté
    
    this.isLoading = true;
    this.demandeAdhesionService.traiterDemande(demandeId, agentId).subscribe({
      next: (demande) => {
        console.log('✅ Demande traitée:', demande);
        this.isLoading = false;
        alert('Demande d\'adhésion prise en charge!');
        this.loadDemandesAdhesion(); // Recharger la liste
      },
      error: (error) => {
        console.error('❌ Erreur traitement demande:', error);
        this.isLoading = false;
        alert('Erreur lors du traitement');
      }
    });
  }

  calculerCotisation(demandeId: number): void {
    this.isLoading = true;
    this.demandeAdhesionService.calculerCotisation(demandeId).subscribe({
      next: (cotisation) => {
        console.log('✅ Cotisation calculée:', cotisation);
        this.isLoading = false;
        alert(`Cotisation calculée: ${cotisation.PrimeBrute}€ (Employeur: ${cotisation.PartEmployeur}€, Salarié: ${cotisation.PartSalarie}€)`);
        this.loadDemandesAdhesion();
      },
      error: (error) => {
        console.error('❌ Erreur calcul cotisation:', error);
        this.isLoading = false;
        alert('Erreur lors du calcul de la cotisation');
      }
    });
  }

  setActiveTab(tab: 'reclamations' | 'adhesions'): void {
    this.activeTab = tab;
  }
  // agent-dashboard.component.ts
getTexteFiltre(): string {
  switch (this.filtreStatut) {
    case 0: return 'en attente';
    case 1: return 'en cours de traitement';
    case 2: return 'validées';
    case 3: return 'rejetées';
    default: return '';
  }
}

voirCotisation(demandeId: number): void {
  // Implémentez la visualisation de la cotisation
  console.log('Voir cotisation pour demande:', demandeId);
  alert('Fonctionnalité à implémenter');
}

validerDemande(demandeId: number): void {
  this.isLoading = true;
  // Implémentez la validation finale
  console.log('Validation demande:', demandeId);
  this.isLoading = false;
  alert('Fonctionnalité à implémenter');
}

}