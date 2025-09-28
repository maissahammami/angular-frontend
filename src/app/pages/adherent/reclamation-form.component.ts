import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReclamationService } from '../../services/api/reclamation.service';
import { Reclamation, TypeReclamation } from '../../models/reclamation.model';

@Component({
  selector: 'app-reclamation-form',
  templateUrl: './reclamation-form.component.html',
  styleUrls: ['./reclamation-form.component.scss']
})
export class ReclamationFormComponent implements OnInit {
  @Input() adherentId!: number;  // ← Recevez l'ID de l'adhérent
  @Output() reclamationCree = new EventEmitter<Reclamation>();
  
  reclamationForm!: FormGroup; // ← Ajoutez le point d'exclamation si nécessaire
  typesReclamation = Object.keys(TypeReclamation)
    .filter(key => isNaN(Number(key)))
    .map(key => ({ 
      value: TypeReclamation[key as keyof typeof TypeReclamation], 
      label: this.getTypeLabel(TypeReclamation[key as keyof typeof TypeReclamation])
    }));
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private reclamationService: ReclamationService
  ) {
    this.reclamationForm = this.fb.group({
      Type: ['', Validators.required],
      Description: ['']  // ← Ajoutez un champ description
    });
  }

  ngOnInit(): void {
    // Pré-remplir l'ID adhérent si fourni
    if (this.adherentId) {
      // L'ID est passé via l'input, pas besoin de le mettre dans le form
    }
  }

  // Méthode pour avoir des labels plus friendly
  private getTypeLabel(type: number): string {
    switch (type) {
      case TypeReclamation.VisiteControle: return 'Visite de contrôle';
      // case TypeReclamation.ProblemePaiement: return 'Problème de paiement';
      case TypeReclamation.ProblemeFacturation: return 'Problème de facturation';
      case TypeReclamation.Autre: return 'Autre problème';
      default: return 'Inconnu';
    }
  }

onSubmit(): void {
  console.log('✅ Formulaire soumis');
  console.log('Valeur du formulaire:', this.reclamationForm.value);
  console.log('AdherentId:', this.adherentId);
  
  if (this.reclamationForm.valid && this.adherentId) {
    this.isLoading = true;
    
    // Formattez les données exactement comme l'API les attend
    const reclamationData = {
      Type: Number(this.reclamationForm.value.Type),
      Statut: 0, // Toujours "Nouvelle" pour une nouvelle réclamation
      DateCreation: new Date().toISOString(), // Format ISO
      AdherentId: Number(this.adherentId),
      AgentId: null, // Ou 0 selon ce que l'API attend
      DemandeVisiteControleId: null // Ou 0
    };

    console.log('📦 Données envoyées à l\'API:', reclamationData);

    this.reclamationService.create(reclamationData).subscribe({
      next: (reclamationCree) => {
        console.log('✅ Réponse API - Réclamation créée:', reclamationCree);
        this.isLoading = false;
        this.reclamationCree.emit(reclamationCree);
        this.reclamationForm.reset();
        
        alert('Réclamation déposée avec succès !');
      },
      error: (error) => {
        console.error('❌ Erreur API:', error);
        this.isLoading = false;
        alert('Erreur lors du dépôt de la réclamation: ' + error.message);
      }
    });
  } else {
    console.warn('⚠️ Formulaire invalide');
    alert('Veuillez remplir tous les champs obligatoires');
  }
}
}