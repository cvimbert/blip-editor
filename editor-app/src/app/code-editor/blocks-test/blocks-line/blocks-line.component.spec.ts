import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksLineComponent } from './blocks-line.component';

describe('BlocksLineComponent', () => {
  let component: BlocksLineComponent;
  let fixture: ComponentFixture<BlocksLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocksLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
