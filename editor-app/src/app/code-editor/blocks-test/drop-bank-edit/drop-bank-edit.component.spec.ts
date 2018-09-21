import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropBankEditComponent } from './drop-bank-edit.component';

describe('DropBankEditComponent', () => {
  let component: DropBankEditComponent;
  let fixture: ComponentFixture<DropBankEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropBankEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropBankEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
