import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerButtonComponent } from './ledger-button.component';

describe('LedgerButtonComponent', () => {
  let component: LedgerButtonComponent;
  let fixture: ComponentFixture<LedgerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
