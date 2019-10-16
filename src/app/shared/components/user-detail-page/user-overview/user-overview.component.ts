import {Component, HostBinding, OnInit} from '@angular/core';
import {MenuItem} from '../../../models/MenuItem';
import {User} from '../../../../core/models/User';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor() { }

  navItems: MenuItem[] = [];
  user: User;
  path: string;

  ngOnInit() {
    this.initNavItems();
  }

  private initNavItems() {
    this.navItems = [
      {
        icon: 'user-white.svg',
        url: `detail`,
        label: 'MENU_ITEMS.USER.DETAIL',
        style: 'user-btn'
      },
      {
        icon: 'vo-white.svg',
        url: `organizations`,
        label: 'MENU_ITEMS.USER.ORGANIZATIONS',
        style: 'user-btn'
      },
      {
        icon: 'group-white.svg',
        url: `groups`,
        label: 'MENU_ITEMS.USER.GROUPS',
        style: 'user-btn'
      },
      {
        icon: 'settings2-white.svg',
        url: `settings`,
        label: 'MENU_ITEMS.USER.SETTINGS',
        style: 'user-btn'
      }
    ];
  }
}
