// import { Component, OnInit } from '@angular/core';
// import { AdherentService } from '../../services/api/adherent.service';
// import { Adherent } from '../../models/adherent.model';

// @Component({
//   selector: 'app-adherent-list',
//   templateUrl: './adherent-list.component.html',
//   styleUrls: ['./adherent-list.component.scss']
// })
// export class AdherentListComponent implements OnInit {
//   adherents: Adherent[] = [];
  
//   constructor(private adherentService: AdherentService) { }

//   ngOnInit(): void {
//     this.loadAdherents();
//   }

//   loadAdherents(): void {
//     this.adherentService.getAll().subscribe(data => {
//       this.adherents = data;
//     });
//   }
// }