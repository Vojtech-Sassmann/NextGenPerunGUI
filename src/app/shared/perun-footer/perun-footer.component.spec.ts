import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerunFooterComponent } from './perun-footer.component';

describe('PerunFooterComponent', () => {
  let component: PerunFooterComponent;
  let fixture: ComponentFixture<PerunFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerunFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerunFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
