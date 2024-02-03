import {Component, NgModule, OnInit} from '@angular/core';
import { CritiqueService } from '../Service/critique.service';
import { CritiqueInterface } from '../Interface/critiques.interface';
import { CommonModule } from '@angular/common';
import {PageEvent} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";

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

  constructor(private critiqueService: CritiqueService) {}

  ngOnInit(): void {
    this.loadCritiques();
  }

  loadCritiques() {
    // Add pagination parameters to your API call
    this.critiqueService.getCritiquesWithPagination(this.pageSize, this.pageIndex + 1).subscribe(
      (response) => {
        this.critiques = response.critiques;
        this.totalCritiques = response.totalCritiques;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.loadCritiques();
  }

  // In your component
  getPages(): number[] {
    const totalPages = Math.ceil(this.totalCritiques / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  goToPage(pageIndex: number) {
    // Logic to fetch paginated critiques for the specified page index
    this.critiqueService.getCritiquesWithPagination(this.pageSize, pageIndex)
      .subscribe(response => {
        this.critiques = response.critiques;
        this.totalCritiques = response.totalCritiques;
      });
  }

}
