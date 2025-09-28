// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DemandeAdhesionService } from '../../services/api/demande-adhesion.service';
// import { PlanSanteService } from '../../services/api/plan-sante.service';
// import { PlanSante } from '../../models/plan-sante.model';
// import { DemandeAdhesion } from '../../models/demande-adhesion.model';

// @Component({
//   selector: 'app-demande-adhesion',
//   templateUrl: './demande-adhesion.component.html',
//   styleUrls: ['./demande-adhesion.component.scss']
// })
// export class DemandeAdhesionComponent implements OnInit {
//   demandeForm: FormGroup;
//   plansSante: PlanSante[] = [];
  
//   constructor(
//     private fb: FormBuilder,
//     private demandeService: DemandeAdhesionService,
//     private planSanteService: PlanSanteService
//   ) {
//     this.demandeForm = this.fb.group({
//       adherentId: ['', Validators.required],
//       planSanteId: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.loadPlansSante();
//   }

//   loadPlansSante(): void {
//     this.planSanteService.getAll().subscribe(data => {
//       this.plansSante = data;
//     });
//   }

//   onSubmit(): void {
//     if (this.demandeForm.valid) {
//       const demande: DemandeAdhesion = {
//         ...this.demandeForm.value,
//         statut: 0, // EnAttente
//         dateDemande: new Date()
//       };
      
//       this.demandeService.create(demande).subscribe(() => {
//         alert('Demande d\'adhésion créée avec succès!');
//         this.demandeForm.reset();
//       });
//     }
//   }
// }