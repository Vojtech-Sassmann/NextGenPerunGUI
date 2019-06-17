import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {RichMember} from '../../../core/models/RichMember';
import {parseEmail, parseFullName, parseLogins, parseStatusColor, parseStatusIcon} from '../../../shared/utils';

export declare class MemberSelectChange {
  member: RichMember;
  checked: boolean;
}

export interface TableMember {
  memberId: number;
  voId: number;
  fullName: string;
  status: string;
  statusIcon: string;
  statusColor: string;
  email: string;
  logins: string;
}

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnChanges {

  constructor(
  ) { }

  private sort: MatSort;

  @ViewChild(MatSort, { static: true }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSource();
  }

  @Input()
  members: RichMember[] = [];

  @Input()
  searchString: string;

  @Output()
  memberSelectChange: EventEmitter<MemberSelectChange> = new EventEmitter<MemberSelectChange>();

  displayedColumns: string[] = ['checkbox', 'memberId', 'fullName', 'statusIcon', 'email', 'logins'];
  dataSource: MatTableDataSource<TableMember>;

  setDataSource() {
    if (!!this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<TableMember>(this.members.map(m => this.parseTableMember(m)));
    this.setDataSource();
  }

  private parseTableMember(richMember: RichMember) {
    return {
      memberId: richMember.id,
      voId: richMember.voId,
      fullName: parseFullName(richMember.user),
      statusIcon: parseStatusIcon(richMember),
      status: richMember.status,
      statusColor: parseStatusColor(richMember),
      email: parseEmail(richMember),
      logins: parseLogins(richMember)
    };
  }

  onMemberSelected(event: MatCheckboxChange, member: RichMember) {
    this.memberSelectChange.emit({member: member, checked: event.checked});
  }
}
