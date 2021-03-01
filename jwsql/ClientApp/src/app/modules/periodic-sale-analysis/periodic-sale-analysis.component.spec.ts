import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicSaleAnalysisComponent } from './periodic-sale-analysis.component';

describe('PeriodicSaleAnalysisComponent', () => {
  let component: PeriodicSaleAnalysisComponent;
  let fixture: ComponentFixture<PeriodicSaleAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicSaleAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicSaleAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
