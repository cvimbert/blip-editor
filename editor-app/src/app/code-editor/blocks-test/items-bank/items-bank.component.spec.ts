import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsBankComponent } from './items-bank.component';

describe('ItemsBankComponent', () => {
  let component: ItemsBankComponent;
  let fixture: ComponentFixture<ItemsBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
