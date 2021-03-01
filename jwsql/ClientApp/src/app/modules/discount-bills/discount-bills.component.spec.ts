import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountBillsComponent } from './discount-bills.component';

describe('DiscountBillsComponent', () => {
  let component: DiscountBillsComponent;
  let fixture: ComponentFixture<DiscountBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
