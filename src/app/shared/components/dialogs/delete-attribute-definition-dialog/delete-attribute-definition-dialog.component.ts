import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {NotificatorService} from '../../../../core/services/common/notificator.service';
import {TranslateService} from '@ngx-translate/core';
import {AttributesService} from '../../../../core/services/api/attributes.service';
import {AttributeDefinition} from '../../../../core/models/AttributeDefinition';

export interface DeleteAttributeDefinitionDialogData {
  attributes: AttributeDefinition[];
}

@Component({
  selector: 'app-delete-attribute-definition-dialog',
  templateUrl: './delete-attribute-definition-dialog.component.html',
  styleUrls: ['./delete-attribute-definition-dialog.component.scss']
})
export class DeleteAttributeDefinitionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteAttributeDefinitionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DeleteAttributeDefinitionDialogData,
              private notificator: NotificatorService,
              private translate: TranslateService,
              private attributeService: AttributesService) {
  }

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<AttributeDefinition>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<AttributeDefinition>(this.data.attributes);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    const ids: number[] = [];
    for (const attr of this.data.attributes) {
      ids.push(attr.id);
    }
    this.attributeService.deleteAttributeDefinitions(ids).subscribe(() => {
      this.translate.get('DIALOGS.DELETE_ATTRIBUTE_DEFINITION.SUCCESS').subscribe(successMessage => {
        this.notificator.showSuccess(successMessage);
        this.dialogRef.close(true);
      });
    });
  }
}
