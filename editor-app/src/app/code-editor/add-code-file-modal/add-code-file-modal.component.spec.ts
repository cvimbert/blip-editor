import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCodeFileModalComponent } from './add-code-file-modal.component';

describe('AddCodeFileModalComponent', () => {
  let component: AddCodeFileModalComponent;
  let fixture: ComponentFixture<AddCodeFileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCodeFileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCodeFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
