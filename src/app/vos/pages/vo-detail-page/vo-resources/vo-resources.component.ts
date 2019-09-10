import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {fadeIn} from '../../../../shared/animations/Animations';

@Component({
  selector: 'app-vo-resources',
  templateUrl: './vo-resources.component.html',
  styleUrls: ['./vo-resources.component.scss'],
  animations: [
    fadeIn
  ]
})
export class VoResourcesComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor(
    private route: ActivatedRoute,
  ) { }

  voId: number;

  ngOnInit(): void {
    this.route.parent.params.subscribe(parentParams => {
      this.voId = parentParams['voId'];
    });
  }
}
