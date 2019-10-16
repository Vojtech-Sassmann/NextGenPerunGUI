import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserOrganizationsComponent } from './user-organizations.component';

describe('AdminUserOrganizationsComponent', () => {
  let component: AdminUserOrganizationsComponent;
  let fixture: ComponentFixture<AdminUserOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
