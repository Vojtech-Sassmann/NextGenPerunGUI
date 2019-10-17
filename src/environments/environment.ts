// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost/krb/rpc/',
  oauth_authority: 'https://login.cesnet.cz/oidc/',
  oauth_callback: 'http://gui-dev.org/api-callback',
  oauth_client_id: '411471d9-5e3d-48bd-9717-25f1fa634d20',
  oauth_post_logout_redirect_uri: 'http://gui-dev.org/',
  oauth_redirect_uri: 'http://gui-dev.org/api-callback',
  oauth_silent_redirect_uri: 'http://gui-dev.org/silent-refresh.html'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
