import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalAnalysisComponent } from './festival-analysis.component';

describe('FestivalAnalysisComponent', () => {
  let component: FestivalAnalysisComponent;
  let fixture: ComponentFixture<FestivalAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FestivalAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivalAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
