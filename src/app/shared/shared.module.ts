import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PerunNavComponent} from './perun-nav/perun-nav.component';
import {RouterModule} from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule, MatMenuModule, MatStepperModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {SideMenuItemComponent} from './side-menu/side-menu-item/side-menu-item.component';
import {MenuButtonsFieldComponent} from './components/menu-buttons-field/menu-buttons-field.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {CreateGroupDialogComponent} from './components/dialogs/create-group-dialog/create-group-dialog.component';
import {InviteMemberDialogComponent} from './components/dialogs/invite-member-dialog/invite-member-dialog.component';
import {UserFullNamePipe} from './pipes/user-full-name.pipe';
import {DeleteGroupDialogComponent} from './components/dialogs/delete-group-dialog/delete-group-dialog.component';
import {BackButtonComponent} from './components/back-button/back-button.component';
import {SettingsToggleItemComponent} from './components/settings-toggle-item/settings-toggle-item.component';
import { ResourceTagsToStringPipe } from './pipes/resource-tags-to-string.pipe';
import { ApplicationStatePipe } from './pipes/application-state.pipe';
import { NotificatorComponent } from './components/notificator/notificator.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import { AttributeTypeCleanPipe } from './pipes/attribute-type-clean.pipe';
import { NameSpaceToDefPipe } from './pipes/name-space-to-def.pipe';
import {UsersListComponent} from './components/users-list/users-list.component';
import { ApplicationReSendNotificationDialogComponent
} from './components/dialogs/application-re-send-notification-dialog/application-re-send-notification-dialog.component';
import { ApplicationRejectDialogComponent } from './components/dialogs/application-reject-dialog/application-reject-dialog.component';
import { AnyToStringPipe } from './pipes/any-to-string.pipe';
import { DeleteAttributeDialogComponent } from './components/dialogs/delete-attribute-dialog/delete-attribute-dialog.component';
import { MemberStatusIconPipe } from './pipes/member-status-icon.pipe';
import { MemberStatusIconColorPipe } from './pipes/member-status-icon-color.pipe';
import { MemberEmailPipe } from './pipes/member-email.pipe';
import { MemberLoginsPipe } from './pipes/member-logins.pipe';
import { RemoveMembersDialogComponent } from './components/dialogs/remove-members-dialog/remove-members-dialog.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SideMenuRootItemComponent } from './side-menu/side-menu-root-item/side-menu-root-item.component';
import { DebuggerPageComponent } from './debugger-page/debugger-page.component';
import { TechnicalOwnersPipe } from './pipes/technical-owners.pipe';
import { RemoveResourceDialogComponent } from './components/dialogs/remove-resource-dialog/remove-resource-dialog.component';
import {ResourcesListComponent} from './components/resources-list/resources-list.component';
import {GroupsListComponent} from './components/groups-list/groups-list.component';
import { AddManagerDialogComponent } from './components/dialogs/add-manager-dialog/add-manager-dialog.component';
import { RemoveManagerDialogComponent } from './components/dialogs/remove-manager-dialog/remove-manager-dialog.component';
import {AddGroupManagerDialogComponent } from './components/dialogs/add-group-manager-dialog/add-group-manager-dialog.component';
import { RemoveGroupManagerDialogComponent } from './components/dialogs/remove-group-manager-dialog/remove-group-manager-dialog.component';
import { ApplicationFormItemTypePipe } from './pipes/application-form-item-type.pipe';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  UpdateApplicationFormDialogComponent
} from './components/dialogs/update-application-form-dialog/update-application-form-dialog.component';
import {
  DeleteApplicationFormItemDialogComponent
} from './components/dialogs/delete-application-form-item-dialog/delete-application-form-item-dialog.component';
import {
  ApplicationFormCopyItemsDialogComponent
} from './components/dialogs/application-form-copy-items-dialog/application-form-copy-items-dialog.component';
import {
  AddApplicationFormItemDialogComponent
} from './components/dialogs/add-application-form-item-dialog/add-application-form-item-dialog.component';
import {
  EditApplicationFormItemDialogComponent
} from './components/dialogs/edit-application-form-item-dialog/edit-application-form-item-dialog.component';
import { ApplicationFormWidgetDescriptionPipe } from './pipes/application-form-widget-description.pipe';
import {AttributesListComponent} from './components/attributes-list/attributes-list.component';
import {CreateAttributeDialogComponent} from './components/dialogs/create-attribute-dialog/create-attribute-dialog.component';
import {AttributeValueComponent} from './components/attributes-list/attribute-value/attribute-value.component';
import {
  AttributeValueBooleanComponent
} from './components/attributes-list/attribute-value/attribute-value-boolean/attribute-value-boolean.component';
import {
  AttributeValueListComponent
} from './components/attributes-list/attribute-value/attribute-value-list/attribute-value-list.component';
import {AttributeValueMapComponent} from './components/attributes-list/attribute-value/attribute-value-map/attribute-value-map.component';
import {
  AttributeValueStringComponent
} from './components/attributes-list/attribute-value/attribute-value-string/attribute-value-string.component';
import { RefreshButtonComponent } from './components/refresh-button/refresh-button.component';
import { AddMemberDialogComponent } from './components/dialogs/add-member-dialog/add-member-dialog.component';
import {MembersCandidatesListComponent} from './components/members-candidates-list/members-candidates-list.component';
import {MemberCandidateEmailPipe} from './pipes/member-candidate-email.pipe';
import {UserVoPipe} from './pipes/vo-or-ext-source.pipe';
import { CreateResourceTagDialogComponent } from './components/dialogs/create-resource-tag-dialog/create-resource-tag-dialog.component';
import { DeleteResourceTagDialogComponent } from './components/dialogs/delete-resource-tag-dialog/delete-resource-tag-dialog.component';
import { MoveGroupDialogComponent } from './components/dialogs/move-group-dialog/move-group-dialog.component';
import {GroupMenuComponent} from './components/group-menu/group-menu.component';
import { ManagersPageComponent } from './components/managers-page/managers-page.component';
import {
  DeleteNotificationDialogComponent
} from './components/dialogs/delete-notification-dialog/delete-notification-dialog.component';
import {
  EditEmailFooterDialogComponent
} from './components/dialogs/edit-email-footer-dialog/edit-email-footer-dialog.component';
import {
  AddEditNotificationDialogComponent
} from './components/dialogs/add-edit-notification-dialog/add-edit-notification-dialog.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { TagSectionComponent } from './components/dialogs/add-edit-notification-dialog/tag-section/tag-section.component';
import { TagBarComponent } from './components/dialogs/add-edit-notification-dialog/tag-bar/tag-bar.component';
import {
  NotificationsCopyMailsDialogComponent
} from './components/dialogs/notifications-copy-mails-dialog/notifications-copy-mails-dialog.component';
import { ImmediateFilterComponent } from './components/immediate-filter/immediate-filter.component';
import {DisplayedRolePipe} from './pipes/displayed-role.pipe';
import { AnimatedRouterOutletComponent } from './components/animated-router-outlet/animated-router-outlet.component';
import { UserEmailPipe } from './pipes/user-email.pipe';
import { UserDetailComponent } from './components/user-detail-page/user-detail/user-detail.component';
import { ResourcesTagsListComponent } from './components/resources-tags-list/resources-tags-list.component';
import { DebounceFilterComponent } from './components/debounce-filter/debounce-filter.component';
import { UserDetailPageComponent } from './components/user-detail-page/user-detail-page.component';
import {UserOverviewComponent} from './components/user-detail-page/user-overview/user-overview.component';
import {UserGroupsComponent} from './components/user-detail-page/user-groups/user-groups.component';
import {UserSettingsComponent} from './components/user-detail-page/user-settings/user-settings.component';
import {UserOrganizationsComponent} from './components/user-detail-page/user-organizations/user-organizations.component';
import {UserAttributesComponent} from './components/user-detail-page/user-settings/user-attributes/user-attributes.component';
import {
  UserSettingsOverviewComponent
} from './components/user-detail-page/user-settings/user-settings-overview/user-settings-overview.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
// tslint:disable-next-line:max-line-length
import { DeleteAttributeDefinitionDialogComponent } from './components/dialogs/delete-attribute-definition-dialog/delete-attribute-definition-dialog.component';
// tslint:disable-next-line:max-line-length
import { CreateAttributeDefinitionDialogComponent } from './components/dialogs/create-attribute-definition-dialog/create-attribute-definition-dialog.component';
import { PerunFooterComponent } from './perun-footer/perun-footer.component';
import { BugReportDialogComponent } from './components/bug-report-dialog/bug-report-dialog.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    TranslateModule.forChild({}),
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDividerModule,
    MatRippleModule,
    MatPaginatorModule,
    MatCardModule,
    MatStepperModule,
    NgxGraphModule,
    NgxChartsModule,
    DragDropModule,
    NgxChartsModule,
    DragDropModule,
    NgxChartsModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    ScrollingModule
  ],
  exports: [
    PerunNavComponent,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    SideMenuComponent,
    MatSidenavModule,
    TranslateModule,
    MenuButtonsFieldComponent,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    UserFullNamePipe,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    BackButtonComponent,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDividerModule,
    MatCardModule,
    MatStepperModule,
    SettingsToggleItemComponent,
    MatRippleModule,
    ResourceTagsToStringPipe,
    ApplicationStatePipe,
    MatPaginatorModule,
    NotificatorComponent,
    AttributeTypeCleanPipe,
    NameSpaceToDefPipe,
    UsersListComponent,
    MemberStatusIconPipe,
    MemberStatusIconColorPipe,
    MemberEmailPipe,
    MemberLoginsPipe,
    NgxGraphModule,
    NgxChartsModule,
    TechnicalOwnersPipe,
    ResourcesListComponent,
    GroupsListComponent,
    ApplicationFormItemTypePipe,
    DragDropModule,
    ApplicationFormWidgetDescriptionPipe,
    GroupsListComponent,
    RemoveManagerDialogComponent,
    AddManagerDialogComponent,
    AddGroupManagerDialogComponent,
    RemoveGroupManagerDialogComponent,
    ApplicationFormWidgetDescriptionPipe,
    GroupsListComponent,
    ResourcesListComponent,
    TechnicalOwnersPipe,
    UsersListComponent,
    AnyToStringPipe,
    AddMemberDialogComponent,
    MembersCandidatesListComponent,
    MemberCandidateEmailPipe,
    UserVoPipe,
    AttributesListComponent,
    MatChipsModule,
    RefreshButtonComponent,
    MatChipsModule,
    MatExpansionModule,
    MatMenuModule,
    GroupMenuComponent,
    ScrollingModule,
    ImmediateFilterComponent,
    ManagersPageComponent,
    GroupMenuComponent,
    ScrollingModule,
    DisplayedRolePipe,
    ScrollingModule,
    AnimatedRouterOutletComponent,
    ResourcesTagsListComponent,
    DebounceFilterComponent,
    ResourcesTagsListComponent,
    UserDetailComponent,
    UserDetailPageComponent,
    PerunFooterComponent
  ],
  entryComponents: [
    CreateGroupDialogComponent,
    InviteMemberDialogComponent,
    DeleteGroupDialogComponent,
    NotificationDialogComponent,
    ApplicationReSendNotificationDialogComponent,
    ApplicationRejectDialogComponent,
    RemoveMembersDialogComponent,
    RemoveResourceDialogComponent,
    UpdateApplicationFormDialogComponent,
    DeleteApplicationFormItemDialogComponent,
    ApplicationFormCopyItemsDialogComponent,
    AddApplicationFormItemDialogComponent,
    EditApplicationFormItemDialogComponent,
    RemoveResourceDialogComponent,
    RemoveManagerDialogComponent,
    AddManagerDialogComponent,
    AddGroupManagerDialogComponent,
    RemoveGroupManagerDialogComponent,
    RemoveResourceDialogComponent,
    RemoveMembersDialogComponent,
    ApplicationRejectDialogComponent,
    DeleteAttributeDialogComponent,
    AddMemberDialogComponent,
    MembersCandidatesListComponent,
    CreateAttributeDialogComponent,
    CreateResourceTagDialogComponent,
    DeleteResourceTagDialogComponent,
    MoveGroupDialogComponent,
    DeleteNotificationDialogComponent,
    EditEmailFooterDialogComponent,
    AddEditNotificationDialogComponent,
    NotificationsCopyMailsDialogComponent,
    BugReportDialogComponent
  ],
  declarations: [
    AttributesListComponent,
    PerunNavComponent,
    SideMenuComponent,
    SideMenuItemComponent,
    MenuButtonsFieldComponent,
    CreateGroupDialogComponent,
    InviteMemberDialogComponent,
    UserFullNamePipe,
    BackButtonComponent,
    DeleteGroupDialogComponent,
    SettingsToggleItemComponent,
    ResourceTagsToStringPipe,
    ApplicationStatePipe,
    NotificatorComponent,
    NotificationComponent,
    NotificationDialogComponent,
    AttributeTypeCleanPipe,
    NameSpaceToDefPipe,
    UsersListComponent,
    ApplicationStatePipe,
    ApplicationReSendNotificationDialogComponent,
    ApplicationRejectDialogComponent,
    MemberStatusIconPipe,
    MemberStatusIconColorPipe,
    MemberEmailPipe,
    MemberLoginsPipe,
    RemoveMembersDialogComponent,
    SideMenuRootItemComponent,
    DebuggerPageComponent,
    TechnicalOwnersPipe,
    RemoveResourceDialogComponent,
    ResourcesListComponent,
    GroupsListComponent,
    AddManagerDialogComponent,
    RemoveManagerDialogComponent,
    AddManagerDialogComponent,
    AddGroupManagerDialogComponent,
    RemoveGroupManagerDialogComponent,
    GroupsListComponent,
    ApplicationFormItemTypePipe,
    UpdateApplicationFormDialogComponent,
    DeleteApplicationFormItemDialogComponent,
    ApplicationFormCopyItemsDialogComponent,
    AddApplicationFormItemDialogComponent,
    EditApplicationFormItemDialogComponent,
    ApplicationFormWidgetDescriptionPipe,
    GroupsListComponent,
    ResourcesListComponent,
    TechnicalOwnersPipe,
    SideMenuRootItemComponent,
    ApplicationRejectDialogComponent,
    AnyToStringPipe,
    DeleteAttributeDialogComponent,
    AddMemberDialogComponent,
    MembersCandidatesListComponent,
    MemberCandidateEmailPipe,
    UserVoPipe,
    CreateAttributeDialogComponent,
    AttributeValueComponent,
    AttributeValueBooleanComponent,
    AttributeValueListComponent,
    AttributeValueMapComponent,
    AttributeValueStringComponent,
    RefreshButtonComponent,
    CreateResourceTagDialogComponent,
    DeleteResourceTagDialogComponent,
    MoveGroupDialogComponent,
    GroupMenuComponent,
    DeleteNotificationDialogComponent,
    EditEmailFooterDialogComponent,
    AddEditNotificationDialogComponent,
    TagSectionComponent,
    TagBarComponent,
    NotificationsCopyMailsDialogComponent,
    ImmediateFilterComponent,
    GroupMenuComponent,
    ManagersPageComponent,
    DisplayedRolePipe,
    NotificationsCopyMailsDialogComponent,
    AnimatedRouterOutletComponent,
    UserEmailPipe,
    UserDetailComponent,
    ResourcesTagsListComponent,
    UserDetailPageComponent,
    UserOverviewComponent,
    UserGroupsComponent,
    UserSettingsComponent,
    UserOrganizationsComponent,
    UserAttributesComponent,
    UserSettingsOverviewComponent,
    ResourcesTagsListComponent,
    DebounceFilterComponent,
    UserProfileComponent,
    DebounceFilterComponent,
    ResourcesTagsListComponent,
    UserDetailComponent,
    DeleteAttributeDefinitionDialogComponent,
    CreateAttributeDefinitionDialogComponent,
    PerunFooterComponent,
    BugReportDialogComponent,
    AutoFocusDirective
  ],
  providers: [
    AnyToStringPipe,
  ]
})
export class SharedModule {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'cs']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
