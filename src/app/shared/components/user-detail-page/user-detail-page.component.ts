import { Component, OnInit } from '@angular/core';
import {fadeIn} from '../../animations/Animations';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss'],
  animations: [
    fadeIn
  ]
})
export class UserDetailPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
