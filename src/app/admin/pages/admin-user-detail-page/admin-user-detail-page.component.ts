import { Component, OnInit } from '@angular/core';
import {User} from '../../../core/models/User';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../../core/services/api/users.service';
import {SideMenuService} from '../../../core/services/common/side-menu.service';
import {SideMenuItemService} from '../../../shared/side-menu/side-menu-item.service';

@Component({
  selector: 'app-admin-user-detail-page',
  templateUrl: './admin-user-detail-page.component.html',
  styleUrls: ['./admin-user-detail-page.component.scss']
})
export class AdminUserDetailPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private sideMenuService: SideMenuService,
    private sideMenuItemService: SideMenuItemService
  ) { }

  user: User;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['userId'];

      this.usersService.getUserById(userId).subscribe(user => {
        this.user = user;

        const userItem = this.sideMenuItemService.parseUser(user);
        this.sideMenuService.setAdminItems([userItem]);
      });
    });
  }
}
