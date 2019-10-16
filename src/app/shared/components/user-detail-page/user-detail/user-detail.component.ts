import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor() { }

  ngOnInit() {
  }

}
