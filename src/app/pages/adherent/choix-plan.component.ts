// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { PlanSanteService } from '../../services/api/plan-sante.service';
// import { PlanSante } from '../../models/plan-sante.model';

// @Component({
//   selector: 'app-choix-plan',
//   templateUrl: './choix-plan.component.html',
//   styleUrls: ['./choix-plan.component.scss']
// })
// export class ChoixPlanComponent implements OnInit {
//   @Output() planSelected = new EventEmitter<number>();
//   plansSante: PlanSante[] = [];
//   selectedPlanId?: number;

//   constructor(private planSanteService: PlanSanteService) { }

//   ngOnInit(): void {
//     this.loadPlansSante();
//   }

//   loadPlansSante(): void {
//     this.planSanteService.getAll().subscribe(data => {
//       this.plansSante = data;
//     });
//   }

//   selectPlan(planId: number): void {
//     this.selectedPlanId = planId;
//     this.planSelected.emit(planId);
//   }
// }