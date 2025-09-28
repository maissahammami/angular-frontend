import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeContreVisiteService } from '../../services/api/demande-contre-visite.service';
import { MedecinControleService } from '../../services/api/medecin-controle.service';
import { MedecinControle } from '../../models/medecin-controle.model';

@Component({
  selector: 'app-assigner-medecin',
  templateUrl: './assigner-medecin.component.html',
  styleUrls: ['./assigner-medecin.component.scss']
})
export class AssignerMedecinComponent implements OnInit {
  demandeId!: number;
  medecins: MedecinControle[] = [];
  assignerForm: FormGroup;
  isLoading = false;
  apiConnected = false;

  constructor(
    private fb: FormBuilder,
    private demandeService: DemandeContreVisiteService,
    private medecinService: MedecinControleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.assignerForm = this.fb.group({
      controleurId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.demandeId = +this.route.snapshot.paramMap.get('id')!;
    console.log('🆔 ID récupéré:', this.demandeId);
    
    // this.testApiConnection();
    this.loadMedecins();
  }

  // testApiConnection(): void {
  //   this.demandeService.testApiConnection().subscribe({
  //     next: () => {
  //       this.apiConnected = true;
  //       console.log('✅ API connectée');
  //     },
  //     error: (error) => {
  //       this.apiConnected = false;
  //       console.error('❌ API non connectée:', error);
  //     }
  //   });
  // }

  loadMedecins(): void {
    this.isLoading = true;
    this.medecinService.getAll().subscribe({
      next: (data) => {
        this.medecins = data;
        this.isLoading = false;
        console.log('👨‍⚕️ Médecins chargés:', this.medecins.length);
      },
      error: (error) => {
        console.error('Erreur chargement médecins:', error);
        this.isLoading = false;
        alert('Erreur lors du chargement des médecins');
      }
    });
  }

  onSubmit(): void {
    // Validation basique
    if (!this.assignerForm.valid) {
      alert('Veuillez sélectionner un médecin');
      return;
    }

    if (!this.demandeId) {
      alert('ID de demande invalide');
      return;
    }

    this.isLoading = true;
    const controleurId = this.assignerForm.value.controleurId;

    console.log('🎯 Début assignation:', {
      demandeId: this.demandeId,
      controleurId: controleurId
    });

    this.demandeService.assignerAControleur(this.demandeId, controleurId).subscribe({
      next: (demande) => {
        console.log('✅ Assignation réussie:', demande);
        this.isLoading = false;
        alert('Médecin assigné avec succès!');
        this.router.navigate(['/agent']);
      },
      error: (error) => {
        console.error('❌ Erreur assignation:', error);
        this.isLoading = false;
        this.handleAssignmentError(error);
      }
    });
  }

  private handleAssignmentError(error: any): void {
    if (error.status === 404) {
      this.showBackendSolution();
    } else if (error.status === 0) {
      alert('❌ Impossible de se connecter au serveur. Vérifiez que le backend est démarré.');
    } else {
      alert(`Erreur ${error.status}: ${error.message}`);
    }
  }

  private showBackendSolution(): void {
    const solution = `
🚨 PROBLÈME BACKEND

L'endpoint suivant n'existe pas :
POST https://localhost:5001/api/DemandesContreVisite/${this.demandeId}/assigner

➡️ SOLUTION : Ajoutez cette méthode dans votre contrôleur C# :

[HttpPost("{id}/assigner")]
public async Task<ActionResult<DemandeContreVisite>> AssignerControleur(
    int id, 
    [FromBody] AssignationRequest request)
{
    var demande = await _context.DemandesContreVisite.FindAsync(id);
    if (demande == null) return NotFound();
    
    demande.ControleurMedicalId = request.ControleurMedicalId;
    demande.Statut = DemandeStatut.Assignee;
    
    await _context.SaveChangesAsync();
    return Ok(demande);
}

public class AssignationRequest
{
    public int ControleurMedicalId { get; set; }
}
`;
    console.error(solution);
    alert('Endpoint backend manquant. Voir la console pour la solution.');
  }

  // Méthode temporaire pour tester l'interface sans backend
  assignerMock(): void {
    this.isLoading = true;
    
    // Simulation d'une assignation réussie
    setTimeout(() => {
      this.isLoading = false;
      alert('✅ Médecin assigné avec succès (simulation)');
      this.router.navigate(['/agent']);
    }, 1500);
  }
}