import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserDetailPageComponent } from './admin-user-detail-page.component';

describe('UserDetailPageComponent', () => {
  let component: AdminUserDetailPageComponent;
  let fixture: ComponentFixture<AdminUserDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
