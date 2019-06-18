import { Component, OnInit } from '@angular/core';
import {MenuItem} from '../../../../shared/models/MenuItem';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss']
})
export class AdminOverviewComponent implements OnInit {

  constructor() { }

  navItems: MenuItem[] = [
    {
      icon: 'attributes-white.svg',
      url: '/admin/attributes',
      label: 'MENU_ITEMS.ADMIN.ATTRIBUTES',
      style: 'admin-btn'
    },
    {
      icon: 'preview-white.svg',
      url: '/admin/visualizer',
      label: 'MENU_ITEMS.ADMIN.VISUALIZER',
      style: 'admin-btn'
    }
  ];

  ngOnInit() {
  }

}
