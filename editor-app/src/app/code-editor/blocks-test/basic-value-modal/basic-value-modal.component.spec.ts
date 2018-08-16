import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicValueModalComponent } from './basic-value-modal.component';

describe('BasicValueModalComponent', () => {
  let component: BasicValueModalComponent;
  let fixture: ComponentFixture<BasicValueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicValueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicValueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
