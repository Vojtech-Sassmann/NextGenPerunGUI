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
      this.authService.getUserManager().getUser().then( function(user) {
        console.log(user);
        this.authService.userSet.emit(user);
        console.log(this.authService.getUserManager().getUser());
      });
    }).catch((err) => {
        console.log(err);
      });
  }

}
