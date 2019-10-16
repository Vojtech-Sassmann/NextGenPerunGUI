import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsOverviewComponent } from './user-settings-overview.component';

describe('UserSettingsOverviewComponent', () => {
  let component: UserSettingsOverviewComponent;
  let fixture: ComponentFixture<UserSettingsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
