import {Component, HostBinding, OnInit} from '@angular/core';

import { graphviz } from 'd3-graphviz';
import {AttributesService} from '../../../../../core/services/api/attributes.service';

@Component({
  selector: 'app-visualizer-attr-modules',
  templateUrl: './visualizer-attr-modules.component.html',
  styleUrls: ['./visualizer-attr-modules.component.scss']
})
export class VisualizerAttrModulesComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor(
    private attributesService: AttributesService
  ) { }

  ngOnInit() {
    this.attributesService.getAttributeModulesDependenciesGraphText('DOT').subscribe(data => {
      const graphData = data.graph
        .replace('\\t', '')
        .replace('\\n', '')
        .replace('\\', '');

      graphviz('#dependenciesGraph', {zoom: false})
        .renderDot(graphData);
    });
  }
}
