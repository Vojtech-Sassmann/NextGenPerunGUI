import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedRouterOutletComponent } from './animated-router-outlet.component';

describe('AnimatedRouterOutletComponent', () => {
  let component: AnimatedRouterOutletComponent;
  let fixture: ComponentFixture<AnimatedRouterOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedRouterOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
