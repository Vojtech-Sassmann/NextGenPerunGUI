import {Component, HostBinding, OnInit} from '@angular/core';
import {AttributesService} from '../../../../core/services/api/attributes.service';
import {AttributeDefinition} from '../../../../core/models/AttributeDefinition';
import {SelectionModel} from '@angular/cdk/collections';
import {filterCoreAttributesDefinitions} from '../../../../shared/utils';
// tslint:disable-next-line:max-line-length
import {DeleteAttributeDefinitionDialogComponent} from '../../../../shared/components/dialogs/delete-attribute-definition-dialog/delete-attribute-definition-dialog.component';
import {MatDialog} from '@angular/material';
// tslint:disable-next-line:max-line-length
import {CreateAttributeDefinitionDialogComponent} from '../../../../shared/components/dialogs/create-attribute-definition-dialog/create-attribute-definition-dialog.component';

@Component({
  selector: 'app-admin-attributes',
  templateUrl: './admin-attributes.component.html',
  styleUrls: ['./admin-attributes.component.scss']
})
export class AdminAttributesComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor(
    private dialog: MatDialog,
    private attrService: AttributesService
  ) {
  }

  attrDefinitions: AttributeDefinition[] = [];

  selected = new SelectionModel<AttributeDefinition>(true, []);
  filterValue = '';

  loading: boolean;

  ngOnInit() {
    this.refreshTable();
  }

  onCreate() {
    const dialogRef = this.dialog.open(CreateAttributeDefinitionDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshTable();
      }
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteAttributeDefinitionDialogComponent, {
      width: '450px',
      data: {
        attributes: this.selected.selected
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshTable();
        this.selected.clear();
      }
    });
  }

  refreshTable() {
    this.loading = true;
    this.attrService.getAttributesDefinition().subscribe(attrDefs => {
      this.attrDefinitions = filterCoreAttributesDefinitions(attrDefs);
      this.loading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue;
  }

}
