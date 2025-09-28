import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeContreVisiteService } from '../../services/api/demande-contre-visite.service';
import { RapportMedical } from '../../models/rapport-medical.model';

@Component({
  selector: 'app-rapport-medical',
  templateUrl: './rapport-medical.component.html',
  styleUrls: ['./rapport-medical.component.scss']
})
export class RapportMedicalComponent implements OnInit {
  @Input() demandeId!: number;
  rapportForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private demandeService: DemandeContreVisiteService
  ) {
    this.rapportForm = this.fb.group({
      conclusion: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.rapportForm.valid && this.demandeId) {
      this.isLoading = true;
      const rapport: RapportMedical = {
        Conclusion: this.rapportForm.value.conclusion,
        DateCreation: new Date(),
        DemandeVisiteControleId: this.demandeId,
        ControleurMedicalId: 0 // Sera rempli par le backend
      };

      this.demandeService.aboutitRapportMedical(this.demandeId, rapport).subscribe({
        next: (rapportCree) => {
          console.log('Rapport créé:', rapportCree);
          this.isLoading = false;
          this.rapportForm.reset();
          alert('Rapport médical créé avec succès!');
        },
        error: (error) => {
          console.error('Erreur création rapport:', error);
          this.isLoading = false;
        }
      });
    }
  }
}