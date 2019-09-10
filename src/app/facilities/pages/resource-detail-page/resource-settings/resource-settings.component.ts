import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeIn} from '../../../../shared/animations/Animations';

@Component({
  selector: 'app-resource-settings',
  templateUrl: './resource-settings.component.html',
  styleUrls: ['./resource-settings.component.scss'],
  animations: [
    fadeIn
  ]
})
export class ResourceSettingsComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor() {
  }

  ngOnInit() {
  }
}
