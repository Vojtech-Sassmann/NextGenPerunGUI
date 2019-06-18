import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizerOverviewComponent } from './visualizer-overview.component';

describe('VisualizerOverviewComponent', () => {
  let component: VisualizerOverviewComponent;
  let fixture: ComponentFixture<VisualizerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
