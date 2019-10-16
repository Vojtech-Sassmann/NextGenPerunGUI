import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import {SharedModule} from '../shared/shared.module';
import { AdminOverviewComponent } from './pages/admin-page/admin-overview/admin-overview.component';
import { AdminAttributesComponent } from './pages/admin-page/admin-attributes/admin-attributes.component';
import { AttrDefListComponent } from './components/attr-def-list/attr-def-list.component';
import { AdminVisualizerComponent } from './pages/admin-page/admin-visualizer/admin-visualizer.component';
import {
  VisualizerAttrModulesComponent
} from './pages/admin-page/admin-visualizer/visualizer-attr-modules/visualizer-attr-modules.component';
import { VisualizerOverviewComponent } from './pages/admin-page/admin-visualizer/visualizer-overview/visualizer-overview.component';
import {
  UserDestinationRelationshipComponent
} from './pages/admin-page/admin-visualizer/user-destination-relationship/user-destination-relationship.component';
import {
  UserDestinationGraphComponent
} from './pages/admin-page/admin-visualizer/user-destination-relationship/user-destination-graph/user-destination-graph.component';
import { AdminUsersComponent } from './pages/admin-page/admin-users/admin-users.component';
import { AdminUserDetailPageComponent } from './pages/admin-user-detail-page/admin-user-detail-page.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminOverviewComponent,
    AdminAttributesComponent,
    AttrDefListComponent,
    AdminVisualizerComponent,
    VisualizerAttrModulesComponent,
    VisualizerOverviewComponent,
    UserDestinationRelationshipComponent,
    UserDestinationGraphComponent,
    AdminUsersComponent,
    AdminUserDetailPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
