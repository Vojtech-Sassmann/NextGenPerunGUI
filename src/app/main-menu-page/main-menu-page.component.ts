import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../shared/models/MenuItem';
import {SideMenuService} from '../core/services/common/side-menu.service';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss']
})
export class MainMenuPageComponent implements OnInit {

  constructor(
    private sideMenuService: SideMenuService
  ) { }

  items: MenuItem[] = [
    {
      icon: 'vo-white.svg',
      url: '/organizations',
      label: 'MAIN_MENU.VOS',
      style: 'vo-btn'
    },
    {
      icon: 'facility-white.svg',
      url: '/facilities',
      label: 'MAIN_MENU.FACILITIES',
      style: 'facility-btn'
    },
    {
      icon: 'user-white.svg',
      url: '/users',
      label: 'MAIN_MENU.USERS',
      style: 'user-btn'
    },
    {
      icon: 'perun_admin-white.svg',
      url: '/admin',
      label: 'MAIN_MENU.ADMIN',
      style: 'admin-btn'
    }
  ];

  ngOnInit() {
    this.sideMenuService.setMenuItems([]);
  }
}
