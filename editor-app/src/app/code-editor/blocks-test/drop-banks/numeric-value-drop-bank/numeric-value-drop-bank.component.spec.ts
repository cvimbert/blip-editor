import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericValueDropBankComponent } from './numeric-value-drop-bank.component';

describe('NumericValueDropBankComponent', () => {
  let component: NumericValueDropBankComponent;
  let fixture: ComponentFixture<NumericValueDropBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericValueDropBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericValueDropBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
