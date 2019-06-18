import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisualizerComponent } from './admin-visualizer.component';

describe('AdminVisualizerComponent', () => {
  let component: AdminVisualizerComponent;
  let fixture: ComponentFixture<AdminVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
