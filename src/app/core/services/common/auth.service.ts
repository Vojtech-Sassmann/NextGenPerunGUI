import {EventEmitter, Injectable} from '@angular/core';
import {User, UserManager, UserManagerSettings} from 'oidc-client';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.oauth_authority,
    client_id: environment.oauth_client_id,
    redirect_uri: environment.oauth_redirect_uri,
    post_logout_redirect_uri: environment.oauth_post_logout_redirect_uri,
    response_type: 'id_token token',
    scope: 'openid profile perun_api perun_admin',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: environment.oauth_silent_redirect_uri
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  manager: UserManager = new UserManager(getClientSettings());

  userSet: EventEmitter<User> = new EventEmitter<User>();

  user: User = null;
  loggedIn = false;

  redirectUrl: string;

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });

  }

  getUserManager(): UserManager {
    return this.manager;
  }

  isLoggedInPromise(): Observable<boolean> {
    return from(this.manager.getUser()).pipe(map<User, boolean>((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    }));
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    this.manager.getUser().then(user => {
      return 'Bearer ' + user.access_token;
    });
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      this.userSet.emit(this.user);
    });
  }

  startSigninMainWindow() {
    this.manager.signinRedirect({ data: this.redirectUrl }).then(function () {
      console.log('signinRedirect done');
    }).catch(function (err) {
      console.log(err);
    });
  }
}
