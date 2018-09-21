import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualCodeKeyboardComponent } from './virtual-code-keyboard.component';

describe('VirtualCodeKeyboardComponent', () => {
  let component: VirtualCodeKeyboardComponent;
  let fixture: ComponentFixture<VirtualCodeKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualCodeKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualCodeKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
