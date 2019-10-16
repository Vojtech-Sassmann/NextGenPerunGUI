import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAttributesComponent } from './user-attributes.component';

describe('UserAttributesComponent', () => {
  let component: UserAttributesComponent;
  let fixture: ComponentFixture<UserAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
