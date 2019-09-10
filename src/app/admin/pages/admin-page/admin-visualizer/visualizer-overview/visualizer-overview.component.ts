import {Component, HostBinding} from '@angular/core';
import {MenuItem} from '../../../../../shared/models/MenuItem';

@Component({
  selector: 'app-visualizer-overview',
  templateUrl: './visualizer-overview.component.html',
  styleUrls: ['./visualizer-overview.component.scss']
})
export class VisualizerOverviewComponent {

  @HostBinding('class.router-component') true;

  constructor() { }

  items: MenuItem[] = [
    {
      icon: 'module_dependencies.svg',
      url: `attrDependencies`,
      label: 'MENU_ITEMS.VISUALIZER.ATTR_DEPENDENCIES',
      style: 'admin-btn'
    },
    {
      icon: 'user_destination_relationship.svg',
      url: `userDestinationRelationship`,
      label: 'MENU_ITEMS.VISUALIZER.USER_DESTINATION',
      style: 'admin-btn'
    }
  ];
}
