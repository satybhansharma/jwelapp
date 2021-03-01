import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleRegDetailedComponent } from './sale-reg-detailed.component';

describe('SaleRegDetailedComponent', () => {
  let component: SaleRegDetailedComponent;
  let fixture: ComponentFixture<SaleRegDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleRegDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleRegDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
