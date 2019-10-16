import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/common/auth.service';

@Component({
  selector: 'app-auth-silent-refresh',
  templateUrl: './auth-silent-refresh.component.html',
  styleUrls: ['./auth-silent-refresh.component.scss']
})
export class AuthSilentRefreshComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserManager().signinSilentCallback().then( response => {
      console.log(response);
      this.authService.getUserManager().getUser().then( user => {
        this.authService.user = user;
        console.log(user);
      });
    }).catch((err) => {
        console.log(err);
      });
  }

}
