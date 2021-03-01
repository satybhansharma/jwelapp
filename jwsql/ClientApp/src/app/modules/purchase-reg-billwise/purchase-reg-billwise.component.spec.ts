import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRegBillwiseComponent } from './purchase-reg-billwise.component';

describe('PurchaseRegBillwiseComponent', () => {
  let component: PurchaseRegBillwiseComponent;
  let fixture: ComponentFixture<PurchaseRegBillwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseRegBillwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRegBillwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
