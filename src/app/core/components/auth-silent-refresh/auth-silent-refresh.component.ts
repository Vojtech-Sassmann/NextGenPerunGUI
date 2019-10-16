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
      this.authService.getUserManager().getUser().then( user => {
        this.authService.setUser();
        console.log('what i get: ' + user.access_token);
        console.log('what i have: ' + this.authService.user.access_token);
      });
    }).catch((err) => {
        console.log(err);
      });
  }

}
