import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySaleAnalysisComponent } from './monthly-sale-analysis.component';

describe('MonthlySaleAnalysisComponent', () => {
  let component: MonthlySaleAnalysisComponent;
  let fixture: ComponentFixture<MonthlySaleAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlySaleAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySaleAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
