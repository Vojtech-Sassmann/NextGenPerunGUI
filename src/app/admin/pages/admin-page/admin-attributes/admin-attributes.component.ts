import {Component, HostBinding, OnInit} from '@angular/core';
import {AttributesService} from '../../../../core/services/api/attributes.service';
import {AttributeDefinition} from '../../../../core/models/AttributeDefinition';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-admin-attributes',
  templateUrl: './admin-attributes.component.html',
  styleUrls: ['./admin-attributes.component.scss']
})
export class AdminAttributesComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor(
    private attrService: AttributesService
  ) { }

  attrDefinitions: AttributeDefinition[] = [];

  selected = new SelectionModel<AttributeDefinition>(true, []);
  filterValue = '';

  loading: boolean;

  ngOnInit() {
    this.refreshTable();
  }

  applyFilter(value: string) {
    this.filterValue = value.trim().toLowerCase();
  }

  refreshTable() {
    this.loading = true;
    this.attrService.getAttributesDefinition().subscribe(attrDefs => {
      this.attrDefinitions = attrDefs;
      this.loading = false;
    });
  }
}
