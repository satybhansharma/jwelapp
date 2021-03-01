import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleRegBillwiseComponent } from './sale-reg-billwise.component';

describe('SaleRegBillwiseComponent', () => {
  let component: SaleRegBillwiseComponent;
  let fixture: ComponentFixture<SaleRegBillwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleRegBillwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleRegBillwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
