import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttributeDefinitionDialogComponent } from './create-attribute-definition-dialog.component';

describe('CreateAttributeDefinitionDialogComponent', () => {
  let component: CreateAttributeDefinitionDialogComponent;
  let fixture: ComponentFixture<CreateAttributeDefinitionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAttributeDefinitionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAttributeDefinitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
