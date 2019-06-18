import {Component} from '@angular/core';
import {MenuItem} from '../../../../../shared/models/MenuItem';

@Component({
  selector: 'app-visualizer-overview',
  templateUrl: './visualizer-overview.component.html',
  styleUrls: ['./visualizer-overview.component.scss']
})
export class VisualizerOverviewComponent {

  constructor() { }

  items: MenuItem[] = [
    {
      icon: 'attributes-white.svg',
      url: `attrDependencies`,
      label: 'MENU_ITEMS.VISUALIZER.ATTR_DEPENDENCIES',
      style: 'admin-btn'
    }
  ];
}
