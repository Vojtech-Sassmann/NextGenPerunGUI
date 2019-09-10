import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {RichUser} from '../../../core/models/RichUser';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {parseFullName, parseUserEmail, parseVo} from '../../utils';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnChanges {

  constructor() { }

  @ViewChild(MatSort, { static: true }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSource();
  }

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @Input()
  users: RichUser[];

  private sort: MatSort;

  @Input()
  hideColumns: string[] = [];

  @Input()
  disableClick = false;

  @Input()
  selection = new SelectionModel<RichUser>(true, []);

  displayedColumns: string[] = ['select', 'id', 'name', 'email', 'organization'];

  dataSource: MatTableDataSource<RichUser>;

  setDataSource() {
    if (!!this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'name':
            return parseFullName(item);
          case 'email':
            return parseUserEmail(item);
          case 'organization':
            return parseVo(item);
          default:
            return item[property];
        }
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.displayedColumns = this.displayedColumns.filter(x => !this.hideColumns.includes(x));
    this.dataSource = new MatTableDataSource<RichUser>(this.users);
    this.dataSource.paginator = this.paginator;
    this.setDataSource();
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: RichUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
