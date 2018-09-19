import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropBankComponent } from './drop-bank.component';

describe('DropBankComponent', () => {
  let component: DropBankComponent;
  let fixture: ComponentFixture<DropBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
