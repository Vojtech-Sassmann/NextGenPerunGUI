import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-attributes',
  templateUrl: './user-attributes.component.html',
  styleUrls: ['./user-attributes.component.scss']
})
export class UserAttributesComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor() { }

  ngOnInit() {
  }

}
