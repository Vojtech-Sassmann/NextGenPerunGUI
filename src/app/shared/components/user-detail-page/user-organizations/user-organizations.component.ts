import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-organizations',
  templateUrl: './user-organizations.component.html',
  styleUrls: ['./user-organizations.component.scss']
})
export class UserOrganizationsComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor() { }

  ngOnInit() {
  }

}
