import {Component, HostBinding, OnInit} from '@angular/core';
import {MenuItem} from '../../../../models/MenuItem';

@Component({
  selector: 'app-user-settings-overview',
  templateUrl: './user-settings-overview.component.html',
  styleUrls: ['./user-settings-overview.component.scss']
})
export class UserSettingsOverviewComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor(
  ) { }

  navItems: MenuItem[] = [];
  path: string;

  ngOnInit() {
    this.initNavItems();
  }

  private initNavItems() {
    this.navItems = [
      {
        icon: 'attributes-white.svg',
        url: `attributes`,
        label: 'MENU_ITEMS.USER.ATTRIBUTES',
        style: 'user-btn'
      }
    ];
  }
}
