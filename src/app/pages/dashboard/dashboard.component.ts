import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdherentService } from '../../services/api/adherent.service';
import { Adherent, AdherentFormData } from '../../models/adherent.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  // styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  implements OnInit {
  adherents: Adherent[] = [];
  filteredAdherents: Adherent[] = [];
  isLoading = false;
  showAdherentForm = false;
  selectedAdherent: Adherent | null = null;
  isEditMode = false;
  searchTerm: string = '';

  adherentForm: FormGroup;

  constructor(
    private adherentService: AdherentService,
    private fb: FormBuilder
  ) {
    this.adherentForm = this.fb.group({
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      dateInscription: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAdherents();
  }

  loadAdherents(): void {
    this.isLoading = true;
    this.adherentService.getAll().subscribe({
      next: (data) => {
        this.adherents = data;
        this.filteredAdherents = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des adhérents:', error);
        this.isLoading = false;
      }
    });
  }

  filterAdherents(): void {
    if (!this.searchTerm) {
      this.filteredAdherents = this.adherents;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredAdherents = this.adherents.filter(adherent =>
      adherent.Prenom.toLowerCase().includes(term) ||
      adherent.Nom.toLowerCase().includes(term) ||
      adherent.Email.toLowerCase().includes(term) ||
      adherent.Telephone?.toLowerCase().includes(term)
    );
  }

  showCreateAdherent(): void {
    this.selectedAdherent = null;
    this.isEditMode = false;
    this.showAdherentForm = true;
    this.adherentForm.reset({
      dateInscription: new Date().toISOString().split('T')[0]
    });
  }

  showEditAdherent(adherent: Adherent): void {
    this.selectedAdherent = { ...adherent };
    this.isEditMode = true;
    this.showAdherentForm = true;
    this.adherentForm.patchValue({
      prenom: adherent.Prenom,
      nom: adherent.Nom,
      email: adherent.Email,
      telephone: adherent.Telephone || '',
      dateInscription: adherent.DateInscription ? new Date(adherent.DateInscription).toISOString().split('T')[0] : ''
    });
  }

  onSubmitAdherent(): void {
    if (this.adherentForm.valid) {
      this.isLoading = true;
      const formData: AdherentFormData = this.adherentForm.value;

      if (this.isEditMode && this.selectedAdherent) {
        const updatedAdherent: Adherent = {
          ...this.selectedAdherent,
          ...formData
        };

        this.adherentService.update(updatedAdherent.AdherentId!, updatedAdherent).subscribe({
          next: () => {
            this.showAdherentForm = false;
            this.loadAdherents();
          },
          error: (error) => {
            console.error('Erreur lors de la modification:', error);
            this.isLoading = false;
          }
        });
      } else {
    const newAdherent: Adherent = {
      ...formData,
      DateInscription: new Date(formData.DateInscription)
    };

        this.adherentService.create(newAdherent).subscribe({
          next: () => {
            this.showAdherentForm = false;
            this.loadAdherents();
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
            this.isLoading = false;
          }
        });
      }
    }
  }

  deleteAdherent(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet adhérent ?')) {
      this.adherentService.delete(id).subscribe({
        next: () => {
          this.loadAdherents();
          alert('Adhérent supprimé avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  onCancel(): void {
    this.showAdherentForm = false;
  }

  // Méthodes pour les statistiques du dashboard
  getTotalAdherents(): number {
    return this.adherents.length;
  }

  getNewAdherentsThisMonth(): number {
    const now = new Date();
    return this.adherents.filter(adherent => {
      const dateInscription = new Date(adherent.DateInscription);
      return dateInscription.getMonth() === now.getMonth() && 
             dateInscription.getFullYear() === now.getFullYear();
    }).length;
  }
}