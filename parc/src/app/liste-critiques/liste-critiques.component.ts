import {Component, OnInit} from '@angular/core';
import { CritiqueService } from '../Service/critique.service';
import { CritiqueInterface } from '../Interface/critiques.interface';
import { CommonModule } from '@angular/common';
import {MatButton} from "@angular/material/button";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liste-critiques',
  standalone: true,
  imports: [
    CommonModule,
    MatButton
  ],
  templateUrl: './liste-critiques.component.html',
  styleUrl: './liste-critiques.component.scss'
})
export class ListeCritiquesComponent implements OnInit {
  critiques: CritiqueInterface[] = [];
  totalCritiques: number = 0;
  pageSize: number = 5; // You can adjust this based on your preference
  pageIndex: number = 0;
  attractionId: number | undefined;

  constructor(
    private critiqueService: CritiqueService,
    private route: ActivatedRoute
  ) {}

  /**
   * Charge les critiques de la base de données
   * @returns void
   * @memberof ListeCritiquesComponent
   * @description Cette méthode charge les critiques de la base de données en utilisant le service critiqueService.
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.attractionId = +params['id'];
      this.loadCritiques();
    });
  }

  /**
   * Charge les critiques de la base de données
   * @returns void
   * @memberof ListeCritiquesComponent
   * @description Cette méthode charge les critiques de la base de données en utilisant le service critiqueService.
   * Elle utilise la méthode critiqueService.getCritiquesWithPagination pour charger les critiques de la base de données.
   * Si l'identifiant de l'attraction est défini, elle utilise la méthode critiqueService.getCritiquesWithPaginationByAttractionId pour charger les critiques de l'attraction spécifiée.
   * Elle utilise la propriété pageSize pour spécifier le nombre de critiques à charger par page.
   * Elle utilise la propriété pageIndex pour spécifier le numéro de la page à charger.
   */
  loadCritiques() {
    if (this.attractionId) {
      this.critiqueService.getCritiquesWithPaginationByAttractionId(this.attractionId, this.pageSize, this.pageIndex + 1)
        .subscribe(
          (response) => {
            this.critiques = response.critiques;
            this.totalCritiques = response.totalCritiques;
          },
          (error) => {
            console.error('API Error:', error);
          }
        );
    } else {
      this.critiqueService.getCritiquesWithPagination(this.pageSize, this.pageIndex + 1)
        .subscribe(
          (response) => {
            this.critiques = response.critiques;
            this.totalCritiques = response.totalCritiques;
          },
          (error) => {
            console.error('API Error:', error);
          }
        );
    }
  }


  /**
   * Récupère les numéros de page pour la pagination
   */
  getPages(): number[] {
    const totalPages = Math.ceil(this.totalCritiques / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  /**
   * Permet de naviguer vers une page spécifique
   * @param pageIndex
   * @returns void
   * @memberof ListeCritiquesComponent
   * @description Cette méthode permet de naviguer vers une page spécifique en utilisant la méthode critiqueService.getCritiquesWithPaginationByAttractionId pour charger les critiques de l'attraction spécifiée.
   * Elle utilise la méthode critiqueService.getCritiquesWithPagination pour charger les critiques de la base de données.
   */
  goToPage(pageIndex: number) {
    // Logic to fetch paginated critiques for the specified page index
    if (this.attractionId) {
      this.critiqueService.getCritiquesWithPaginationByAttractionId(this.attractionId, this.pageSize, pageIndex)
        .subscribe(response => {
          this.critiques = response.critiques;
          this.totalCritiques = response.totalCritiques;
        });
      return;
    }
    this.critiqueService.getCritiquesWithPagination(this.pageSize, pageIndex)
      .subscribe(response => {
        this.critiques = response.critiques;
        this.totalCritiques = response.totalCritiques;
      });
  }

}
