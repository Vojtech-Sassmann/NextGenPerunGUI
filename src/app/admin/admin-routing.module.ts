import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {AdminOverviewComponent} from './pages/admin-page/admin-overview/admin-overview.component';
import {AdminAttributesComponent} from './pages/admin-page/admin-attributes/admin-attributes.component';
import {AdminVisualizerComponent} from './pages/admin-page/admin-visualizer/admin-visualizer.component';
import {
  VisualizerAttrModulesComponent
} from './pages/admin-page/admin-visualizer/visualizer-attr-modules/visualizer-attr-modules.component';
import {VisualizerOverviewComponent} from './pages/admin-page/admin-visualizer/visualizer-overview/visualizer-overview.component';
import {
  UserDestinationRelationshipComponent
} from './pages/admin-page/admin-visualizer/user-destination-relationship/user-destination-relationship.component';
import {
  UserDestinationGraphComponent
} from './pages/admin-page/admin-visualizer/user-destination-relationship/user-destination-graph/user-destination-graph.component';
import {AdminUsersComponent} from './pages/admin-page/admin-users/admin-users.component';
import {AdminUserDetailPageComponent} from './pages/admin-user-detail-page/admin-user-detail-page.component';
import {UserOverviewComponent} from '../shared/components/user-detail-page/user-overview/user-overview.component';
import {UserDetailComponent} from '../shared/components/user-detail-page/user-detail/user-detail.component';
import {UserOrganizationsComponent} from '../shared/components/user-detail-page/user-organizations/user-organizations.component';
import {UserGroupsComponent} from '../shared/components/user-detail-page/user-groups/user-groups.component';
import {UserSettingsComponent} from '../shared/components/user-detail-page/user-settings/user-settings.component';
import {UserAttributesComponent} from '../shared/components/user-detail-page/user-settings/user-attributes/user-attributes.component';
import {
  UserSettingsOverviewComponent
} from '../shared/components/user-detail-page/user-settings/user-settings-overview/user-settings-overview.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: '',
        component: AdminOverviewComponent,
        data: {animation: 'AdminOverviewPage'}
      },
      {
        path: 'attributes',
        component: AdminAttributesComponent,
        data: {animation: 'AdminAttributesPage'}
      },
      {
        path: 'users',
        component: AdminUsersComponent,
        data: {animation: 'AdminUsersPage'}
      },
      {
        path: 'visualizer',
        component: AdminVisualizerComponent,
        children: [
          {
            path: '',
            component: VisualizerOverviewComponent,
            data: {animation: 'VisualizerOverviewPage'}
          },
          {
            path: 'attrDependencies',
            component: VisualizerAttrModulesComponent,
            data: {animation: 'VisualizerAttrModulesPage'}
          },
          {
            path: 'userDestinationRelationship',
            component: UserDestinationRelationshipComponent,
            data: {animation: 'UserDestinationRelationshipPage'}
          },
          {
            path: 'userDestinationRelationship/graph',
            component: UserDestinationGraphComponent,
            data: {animation: 'UserDestinationGraphPage'}
          }
        ]
      }
    ]
  },
  {
    path: 'users/:userId',
    component: AdminUserDetailPageComponent,
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
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutingModule { }
