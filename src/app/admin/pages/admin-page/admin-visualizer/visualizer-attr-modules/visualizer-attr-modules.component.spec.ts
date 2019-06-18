import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizerAttrModulesComponent } from './visualizer-attr-modules.component';

describe('VisualiserAttrModulesComponent', () => {
  let component: VisualizerAttrModulesComponent;
  let fixture: ComponentFixture<VisualizerAttrModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizerAttrModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizerAttrModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
