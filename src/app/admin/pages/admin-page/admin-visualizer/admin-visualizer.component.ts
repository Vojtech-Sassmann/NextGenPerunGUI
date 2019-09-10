import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-visualizer',
  templateUrl: './admin-visualizer.component.html',
  styleUrls: ['./admin-visualizer.component.scss']
})
export class AdminVisualizerComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor() { }

  ngOnInit() {
  }

}
