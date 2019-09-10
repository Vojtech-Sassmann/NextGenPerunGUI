import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {fadeIn} from '../../animations/Animations';

@Component({
  selector: 'app-animated-router-outlet',
  templateUrl: './animated-router-outlet.component.html',
  styleUrls: ['./animated-router-outlet.component.scss'],
  animations: [
    fadeIn
  ]
})
export class AnimatedRouterOutletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
