import {Component, HostBinding, OnInit} from '@angular/core';
import {RichUser} from '../../../../core/models/RichUser';
import {UsersService} from '../../../../core/services/api/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor(
    private usersService: UsersService
  ) { }

  users: RichUser[];

  searchString = '';
  loading = false;
  firstSearchDone = false;

  ngOnInit() {
  }

  onSearchByString() {
    this.loading = true;
    this.firstSearchDone = true;
    this.usersService.findRichUsers(this.searchString).subscribe(users => {
      this.users = users;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  onKeyInput(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.searchString.length > 0) {
      this.onSearchByString();
    }
  }
}
