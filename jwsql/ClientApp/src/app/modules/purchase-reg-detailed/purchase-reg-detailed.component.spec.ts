import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRegDetailedComponent } from './purchase-reg-detailed.component';

describe('PurchaseRegDetailedComponent', () => {
  let component: PurchaseRegDetailedComponent;
  let fixture: ComponentFixture<PurchaseRegDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseRegDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRegDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
