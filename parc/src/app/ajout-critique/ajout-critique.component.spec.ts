import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCritiqueComponent } from './ajout-critique.component';

describe('AjoutCritiqueComponent', () => {
  let component: AjoutCritiqueComponent;
  let fixture: ComponentFixture<AjoutCritiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutCritiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutCritiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
