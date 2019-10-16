import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainMenuPageComponent} from './main-menu-page/main-menu-page.component';
import {AuthCallbackComponent} from './core/components/auth-callback/auth-callback.component';
import {AuthSilentRefreshComponent} from './core/components/auth-silent-refresh/auth-silent-refresh.component';
import {UserProfileComponent} from './shared/components/user-profile/user-profile.component';
import {UserOverviewComponent} from './shared/components/user-detail-page/user-overview/user-overview.component';
import {UserDetailComponent} from './shared/components/user-detail-page/user-detail/user-detail.component';
import {UserOrganizationsComponent} from './shared/components/user-detail-page/user-organizations/user-organizations.component';
import {UserGroupsComponent} from './shared/components/user-detail-page/user-groups/user-groups.component';
import {UserSettingsComponent} from './shared/components/user-detail-page/user-settings/user-settings.component';
import {
  UserSettingsOverviewComponent
} from './shared/components/user-detail-page/user-settings/user-settings-overview/user-settings-overview.component';
import {UserAttributesComponent} from './shared/components/user-detail-page/user-settings/user-attributes/user-attributes.component';

const routes: Routes = [
  {
    path: '',
    component: MainMenuPageComponent,
  },
  {
    path: 'api-callback',
    component: AuthCallbackComponent,
  },
  {
    path: 'silent-refresh',
    component: AuthSilentRefreshComponent,
  },
  {
    path: 'organizations',
    loadChildren: () => import('./vos/vos.module').then(m => m.VosModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'facilities',
    loadChildren: () => import('./facilities/facilities.module').then(m => m.FacilitiesModule),
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    children: [
      {
        path: '',
        component: UserOverviewComponent,
        data: {animation: 'UserOverviewPage'}
      },
      {
        path: 'detail',
        component: UserDetailComponent,
        data: {animation: 'UserDetailPage'}
      },
      {
        path: 'organizations',
        component: UserOrganizationsComponent,
        data: {animation: 'UserOrganizationsPage'}
      },
      {
        path: 'groups',
        component: UserGroupsComponent,
        data: {animation: 'UserGroupsPage'}
      },
      {
        path: 'settings',
        component: UserSettingsComponent,
        children: [
          {
            path: '',
            component: UserSettingsOverviewComponent,
            data: {animation: 'UserSettingsOverviewPage'}
          },
          {
            path: 'attributes',
            component: UserAttributesComponent,
            data: {animation: 'UserAttributesPage'}
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
