import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttrDefListComponent } from './attr-def-list.component';

describe('AttrDefListComponent', () => {
  let component: AttrDefListComponent;
  let fixture: ComponentFixture<AttrDefListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttrDefListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttrDefListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
