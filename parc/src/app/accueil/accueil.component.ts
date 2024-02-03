import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import {MatDialog} from "@angular/material/dialog";
import {AjoutCritiqueComponent} from "../ajout-critique/ajout-critique.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButton],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

  constructor(
    public attractionService: AttractionService,
    public dialog: MatDialog
  )
  {}

  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttraction()

  ouvrirModal(attractionNom: string, attraction_id: number) {
    const dialogRef = this.dialog.open(AjoutCritiqueComponent, {
      data: { nom: attractionNom, attraction_id: attraction_id },
    });

    dialogRef.afterClosed().subscribe(result => {
      // Vous pouvez traiter le résultat ici si nécessaire
    });
  }

}
