import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatFormField} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { HttpHeaders} from '@angular/common/http';
import { CritiqueService } from '../Service/critique.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-ajout-critique',
  templateUrl: './ajout-critique.component.html',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatInputModule,
    CommonModule,
    MatIcon
  ],
  styleUrls: ['./ajout-critique.component.scss']
})
export class AjoutCritiqueComponent{
  critiqueForm: FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;
  temporaryRating: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AjoutCritiqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nom: string, attraction_id: number },
    private formBuilder: FormBuilder,
    private critiqueService: CritiqueService,
    private _snackBar: MatSnackBar

  ) {
    this.critiqueForm = this.formBuilder.group({
      attraction_id: [this.data.attraction_id],  // Utilisez data.attraction_id ici
      nom: ['', Validators.required],
      prenom: [''],
      note: ['', Validators.pattern('^[1-4](\.[0-9])?$|^5$')],
      texte: ['', Validators.max(500)],
    });
  }

  /**
   * Définissez la note de la critique
   * @param rating - La note de la critique
   */
  setRating(rating: number): void {
    this.rating = rating;
    this.temporaryRating = rating;
    this.critiqueForm.get('note')?.setValue(this.rating);
  }

/**
   * Réinitialisez la note temporaire
   */
  setTemporaryRating(rating: number): void {
    this.temporaryRating = rating;
  }

  /**
   * Effacez la note temporaire
   */
  clearTemporaryRating(): void {
    this.temporaryRating = this.rating;
  }


  /**
   * Enregistrez la critique dans la base de données
   * @returns void
   * @memberof AjoutCritiqueComponent
   * @description Cette méthode envoie une requête POST à votre API pour enregistrer la critique dans la base de données.
   * Elle utilise le service critiqueService pour envoyer la requête POST.
   */
  enregistrerCritique() {
    this.critiqueForm.markAllAsTouched();

    if (this.critiqueForm.valid) {
      // Récupérez les valeurs du formulaire
      let critiqueData = this.critiqueForm.value;
      critiqueData.prenom = critiqueData.prenom || 'Anonyme';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      // Envoyez la requête POST à votre API
      console.log('Critique Data:', critiqueData);
      this.critiqueService.postCritique(critiqueData)
        .subscribe(response => {
          console.log('API Response:', response);
          this._snackBar.open('Critique enregistrée avec succès', 'Fermer', {
            duration: 3000,
          });
          this.fermerModal();
        }, error => {
          console.error('API Error:', error);
        });
    }
  }


  /**
   * Fermez la boîte de dialogue
   * @returns void
   * @memberof AjoutCritiqueComponent
   * @description Cette méthode ferme la boîte de dialogue en cours.
   */
  fermerModal() {
    this.dialogRef.close();
  }

}
