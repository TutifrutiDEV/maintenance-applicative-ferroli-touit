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
    CommonModule
  ],
  styleUrls: ['./ajout-critique.component.scss']
})
export class AjoutCritiqueComponent{
  critiqueForm: FormGroup;

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
      note: ['', Validators.pattern('^[1-5]$')],
      texte: ['', Validators.max(500)],
    });
  }



  enregistrerCritique() {
    this.critiqueForm.markAllAsTouched();

    if (this.critiqueForm.valid) {
      // Récupérez les valeurs du formulaire
      let critiqueData = this.critiqueForm.value;
      critiqueData.prenom = critiqueData.prenom || 'Anonyme';

      // Construisez l'en-tête pour spécifier que le contenu est au format JSON
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
            duration: 3000,  // Durée en millisecondes pour afficher la notification
          });
          this.fermerModal();
        }, error => {
          console.error('API Error:', error);
          // Traitez les erreurs éventuelles ici
        });
    }
  }


  fermerModal() {
    this.dialogRef.close();
  }

}
