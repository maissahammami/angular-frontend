// import { Component, OnInit, Input } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FactureService } from '../../services/api/facture.service';
// import { Paiement, MethodePaiement } from '../../models/paiement.model';

// @Component({
//   selector: 'app-paiement-facture',
//   templateUrl: './paiement-facture.component.html',
//   styleUrls: ['./paiement-facture.component.scss']
// })
// export class PaiementFactureComponent implements OnInit {
//   @Input() factureId!: number;
//   @Input() adherentId!: number;
//   @Input() montantTotal!: number;
  
//   paiementForm: FormGroup;
//   methodesPaiement = Object.keys(MethodePaiement)
//     .filter(key => isNaN(Number(key)))
//     .map(key => ({ value: MethodePaiement[key as keyof typeof MethodePaiement], label: key }));
  
//   isLoading = false;

//   constructor(
//     private fb: FormBuilder,
//     private factureService: FactureService
//   ) {
//     this.paiementForm = this.fb.group({
//       montant: ['', [Validators.required, Validators.min(0.01)]],
//       methode: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.paiementForm.patchValue({
//       montant: this.montantTotal
//     });
//   }

//   onSubmit(): void {
//     if (this.paiementForm.valid) {
//       this.isLoading = true;
//       const paiement: Paiement = {
//         ...this.paiementForm.value,
//         factureId: this.factureId,
//         adherentId: this.adherentId,
//         datePaiement: new Date()
//       };

//       this.factureService.reglerFacture(this.factureId, paiement).subscribe(
//         () => {
//           alert('Paiement effectué avec succès!');
//           this.isLoading = false;
//           this.paiementForm.reset();
//         },
//         (error) => {
//           console.error('Erreur lors du paiement', error);
//           this.isLoading = false;
//         }
//       );
//     }
//   }
// }