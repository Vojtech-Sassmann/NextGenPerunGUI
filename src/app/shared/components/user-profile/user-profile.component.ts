import {Component, OnInit} from '@angular/core';
import {AuthResolverService} from '../../../core/services/common/auth-resolver.service';
import {PerunPrincipal} from '../../../core/models/PerunPrincipal';
import {User} from '../../../core/models/User';
import {SideMenuService} from '../../../core/services/common/side-menu.service';
import {SideMenuItemService} from '../../side-menu/side-menu-item.service';
import {UsersService} from '../../../core/services/api/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    public authResolver: AuthResolverService,
    private usersService: UsersService,
    private sideMenuService: SideMenuService,
    private sideMenuItemService: SideMenuItemService
  ) {
  }

  principal: PerunPrincipal;
  user: User;
  path = `/profile`;
  regex = `/profile`;

  ngOnInit() {
    this.principal = this.authResolver.getPerunPrincipal();
    this.user = this.principal.user;

    const userItem = this.sideMenuItemService.parseUser(this.user, this.path, this.regex);
    this.sideMenuService.setAdminItems([userItem]);
  }
}
