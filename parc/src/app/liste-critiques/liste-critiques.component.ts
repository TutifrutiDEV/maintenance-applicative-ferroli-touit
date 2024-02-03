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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.attractionId = +params['id'];
      this.loadCritiques();
    });
  }

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


  // In your component
  getPages(): number[] {
    const totalPages = Math.ceil(this.totalCritiques / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
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
