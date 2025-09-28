import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NouvelAdherent } from '../../models/adherent.model';

@Component({
  selector: 'app-adherent-form',
  templateUrl: './adherent-form.component.html',
//   styleUrls: ['./adherent-form.component.scss']
})
export class AdherentFormComponent {
  @Output() adherentCree = new EventEmitter<NouvelAdherent>();
  adherentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.adherentForm = this.fb.group({
      Prenom: ['', Validators.required],
      Nom: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Telephone: ['', Validators.required],
      DateNaissance: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.adherentForm.valid) {
      const nouvelAdherent: NouvelAdherent = {
        ...this.adherentForm.value,
        DateNaissance: new Date(this.adherentForm.value.DateNaissance)
      };
      this.adherentCree.emit(nouvelAdherent);
    }
  }
}