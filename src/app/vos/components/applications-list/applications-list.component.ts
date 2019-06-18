import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Application} from '../../../core/models/Application';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnChanges {

  constructor() { }

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSource();
  }

  @Input()
  loading = false;

  @Input()
  applications: Application[] = [];

  @Input()
  displayedColumns: string[] = [];

  dataSource: MatTableDataSource<Application>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private sort: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<Application>(this.applications);
    this.setDataSource();
  }

  setDataSource() {
    if (!!this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'user': {
            if (item.user) {
              return item.user.firstName + '' + item.user.lastName;
            }
            return item.createdBy.slice(item.createdBy.lastIndexOf('=') + 1, item.createdBy.length);
          }
          case 'group': {
            if (item.group) {
              return item.group.name;
            }
            return '-';
          }
          case 'modifiedBy': {
            const index = item.modifiedBy.lastIndexOf('/CN=');
            if (index !== -1) {
              const string =  item.modifiedBy.slice(index + 4, item.modifiedBy.length).replace('/unstructuredName=', ' ').toLowerCase();
              if (string.lastIndexOf('\\') !== -1) {
                return item.modifiedBy.slice(item.modifiedBy.lastIndexOf('=') + 1, item.modifiedBy.length);
              }
              return string;
            }
            return item.modifiedBy.toLowerCase();
          }
          default: return item[property];
        }
      };
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFriendlyName(modifiedBy: string) {
    const index = modifiedBy.lastIndexOf('/CN=');
    if (index !== -1) {
      const string =  modifiedBy.slice(index + 4, modifiedBy.length).replace('/unstructuredName=', ' ');
      if (string.lastIndexOf('\\') !== -1) {
        return modifiedBy.slice(modifiedBy.lastIndexOf('=') + 1, modifiedBy.length);
      }
      return string;
    }
    return modifiedBy;
  }

}
