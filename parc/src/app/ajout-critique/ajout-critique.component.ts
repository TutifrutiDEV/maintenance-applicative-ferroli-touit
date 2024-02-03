import {Component, Inject, Input, NgModule, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatFormField} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CritiqueService } from '../Service/critique.service';
import {error} from "@angular/compiler-cli/src/transformers/util";
@Component({
  selector: 'app-ajout-critique',
  templateUrl: './ajout-critique.component.html',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./ajout-critique.component.scss']
})
export class AjoutCritiqueComponent{
  critiqueForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AjoutCritiqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nom: string, attraction_id: number },
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private critiqueService: CritiqueService
  ) {
    this.critiqueForm = this.formBuilder.group({
      attraction_id: [this.data.attraction_id],  // Utilisez data.attraction_id ici
      nom: ['', Validators.required],
      //prenom: ['', Validators.required],
      note: ['', Validators.required],
      texte: ['', Validators.required],
    });
  }



  enregistrerCritique() {
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
          // Fermez la fenêtre modale après la soumission
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
