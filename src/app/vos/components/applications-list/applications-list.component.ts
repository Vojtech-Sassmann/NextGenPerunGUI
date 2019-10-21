import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Application} from '../../../core/models/Application';
import {Router} from '@angular/router';
import {Group} from '../../../core/models/Group';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnChanges {

  constructor(private router: Router) { }

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSource();
  }

  @Input()
  applications: Application[] = [];

  @Input()
  group: Group;

  @Input()
  displayedColumns: string[] = [];

  @Input()
  filterValue: string;

  dataSource: MatTableDataSource<Application>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private sort: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<Application>(this.applications);
    this.setDataSource();
    this.dataSource.filter = this.filterValue;
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

  selectApplication(application: Application) {
    if (this.group) {
      this.router.navigate(['/organizations', application.vo.id, 'groups', this.group.id, 'applications', application.id]);
    } else {
      this.router.navigate(['/organizations', application.vo.id, 'applications', application.id]);
    }
  }
}
