// import { Component, OnInit, Input } from '@angular/core';
// import { DemandeAdhesionService } from '../../services/api/demande-adhesion.service';
// import { Cotisation } from '../../models/cotisation.model';

// @Component({
//   selector: 'app-calcul-cotisation',
//   templateUrl: './calcul-cotisation.component.html',
//   styleUrls: ['./calcul-cotisation.component.scss']
// })
// export class CalculCotisationComponent implements OnInit {
//   @Input() demandeId!: number;
//   cotisation?: Cotisation;
//   isLoading = false;

//   constructor(private demandeService: DemandeAdhesionService) { }

//   ngOnInit(): void {}

//   calculerCotisation(): void {
//     this.isLoading = true;
//     this.demandeService.calculerCotisation(this.demandeId).subscribe(
//       (data) => {
//         this.cotisation = data;
//         this.isLoading = false;
//       },
//       (error) => {
//         console.error('Erreur lors du calcul de la cotisation', error);
//         this.isLoading = false;
//       }
//     );
//   }
// }