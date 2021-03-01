import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseAnalysisButtonComponent } from './purchase-analysis-button.component';

describe('PurchaseAnalysisButtonComponent', () => {
  let component: PurchaseAnalysisButtonComponent;
  let fixture: ComponentFixture<PurchaseAnalysisButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseAnalysisButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseAnalysisButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
