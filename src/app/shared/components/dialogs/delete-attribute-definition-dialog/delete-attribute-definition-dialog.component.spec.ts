import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAttributeDefinitionDialogComponent } from './delete-attribute-definition-dialog.component';

describe('DeleteAttributeDefinitionDialogComponent', () => {
  let component: DeleteAttributeDefinitionDialogComponent;
  let fixture: ComponentFixture<DeleteAttributeDefinitionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAttributeDefinitionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAttributeDefinitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
