import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Vo} from '../../core/models/Vo';
import {EntityMenuLink, SideMenuItem} from './side-menu.component';
import {Group} from '../../core/models/Group';
import {RichMember} from '../../core/models/RichMember';
import {User} from '../../core/models/User';
import {parseFullName} from '../utils';
import {Facility} from '../../core/models/Facility';
import {Resource} from '../../core/models/Resource';
import {AuthResolverService} from '../../core/services/common/auth-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class SideMenuItemService {

  constructor(
    private translate: TranslateService,
    private authResolver: AuthResolverService,
  ) {
  }

  getFacilitiesManagementItem(): SideMenuItem {
    return {
      label: 'Facilities management',
      colorClass: 'base-item-color-activated',
      icon: 'manage_facility_white.svg',
      baseLink: ['/facilities'],
      links: [],
      baseColorClass: 'base-item-color',
      baseColorClassRegex: '^/facilities$',
    };
  }

  getAccessManagementItem(): SideMenuItem {
    return {
      label: 'Access management',
      colorClass: 'base-item-color-activated',
      icon: 'vo-white.svg',
      links: [],
      baseLink: ['/organizations'],
      baseColorClass: 'base-item-color',
      baseColorClassRegex: '^/organizations$',
    };
  }

  getAdminItem(): SideMenuItem {
    return {
      baseLink: ['/admin'],
      expandable: false,
      label: 'MENU_ITEMS.ADMIN.TITLE',
      colorClass: 'base-item-color-activated',
      icon: 'perun_admin-white.svg',
      baseColorClass: 'base-item-color',
      baseColorClassRegex: '^/admin$',
      activatedClass: 'admin-item-activated',
      linksClass: 'admin-item-links',
      links: [
        {
          label: 'MENU_ITEMS.ADMIN.OVERVIEW',
          url: ['/admin'],
          activatedRegex: '^/admin$'
        },
        {
          label: 'MENU_ITEMS.ADMIN.ATTRIBUTES',
          url: ['/admin/attributes'],
          activatedRegex: '^/admin/attributes$'
        },
        {
          label: 'MENU_ITEMS.ADMIN.USERS',
          url: ['/admin/users'],
          activatedRegex: '^/admin/users$'
        },
        {
          label: 'MENU_ITEMS.ADMIN.VISUALIZER',
          url: ['/admin/visualizer'],
          activatedRegex: '^/admin/visualizer$',
          children: [
            {
              label: 'MENU_ITEMS.VISUALIZER.ATTR_DEPENDENCIES',
              url: ['/admin/visualizer/attrDependencies'],
              activatedRegex: '^/admin/visualizer/attrDependencies'
            },
            {
              label: this.translate.instant('MENU_ITEMS.VISUALIZER.USER_DESTINATION'),
              url: ['/admin/visualizer/userDestinationRelationship'],
              activatedRegex: '^/admin/visualizer/userDestinationRelationship'
            }
          ],
          showChildrenRegex: '/admin/visualizer'
        }
      ]
    };
  }

  parseFacility(facility: Facility): SideMenuItem {
    return {
      label: facility.name,
      baseLink: [`/facilities/${facility.id}`],
      links: [
        {
          label: 'MENU_ITEMS.FACILITY.OVERVIEW',
          url: [`/facilities/${facility.id}`],
          activatedRegex: '/facilities/\\d+$'
        },
        {
          label: 'MENU_ITEMS.FACILITY.RESOURCES',
          url: [`/facilities/${facility.id}/resources`],
          activatedRegex: '/facilities/\\d+/resources$'
        },
        {
          label: 'MENU_ITEMS.FACILITY.ALLOWED_GROUPS',
          url: [`/facilities/${facility.id}/allowed-groups`],
          activatedRegex: '/facilities/\\d+/allowed-groups'
        },
        {
          label: 'MENU_ITEMS.FACILITY.SETTINGS',
          url: ['/facilities', facility.id, 'settings'],
          activatedRegex: '/facilities/\\d+/settings$',
          children: [
            {
              label: 'MENU_ITEMS.FACILITY.ATTRIBUTES',
              url: ['/facilities', facility.id, 'settings', 'attributes'],
              activatedRegex: '/facilities/\\d+/settings/attributes$'
            }
          ],
          showChildrenRegex: '/facilities/\\d+/settings'
        }
      ],
      colorClass: 'facility-item',
      icon: 'manage_facility_white.svg',
      // labelClass: 'facility-text',
      activatedClass: 'facility-item-activated',
      linksClass: 'facility-item-links'
    };
  }

  parseResource(resource: Resource): SideMenuItem {
    return {
      label: resource.name,
      baseLink: ['/facilities', resource.facilityId, 'resources', resource.id],
      links: [
        {
          label: 'MENU_ITEMS.RESOURCE.OVERVIEW',
          url: ['/facilities', resource.facilityId, 'resources', resource.id],
          activatedRegex: '/facilities/\\d+/resources/\\d+$'
        },
        {
          label: 'MENU_ITEMS.RESOURCE.SETTINGS',
          url: [`/facilities/${resource.facilityId}/resources/${resource.id}/settings`],
          activatedRegex: '/facilities/\\d+/resources/\\d+/settings$',
          children: [
            {
              label: 'MENU_ITEMS.RESOURCE.ATTRIBUTES',
              url: [`/facilities/${resource.facilityId}/resources/${resource.id}/settings/attributes`],
              activatedRegex: '/facilities/\\d+/resources/\\d+/settings/attributes$'
            }
          ],
          showChildrenRegex: '/facilities/\\d+/resources/\\d+/settings'
        }
      ],
      colorClass: 'resource-item',
      icon: 'manage_facility_white.svg',
      // labelClass: 'resource-text',
      activatedClass: 'resource-item-activated',
      linksClass: 'resource-item-links',
    };
  }

  parseGroup(group: Group): SideMenuItem {
    return {
      label: group.name,
      baseLink: [`/organizations/${group.voId}/groups/${group.id}`],
      links: [
        {
          label: 'MENU_ITEMS.GROUP.OVERVIEW',
          url: [`/organizations/${group.voId}/groups/${group.id}`],
          activatedRegex: '/organizations/\\d+/groups/\\d+$'
        },
        {
          label: 'MENU_ITEMS.GROUP.MEMBERS',
          url: [`/organizations/${group.voId}/groups/${group.id}/members`],
          activatedRegex: '/organizations/\\d+/groups/\\d+/members$'
        },
        {
          label: 'MENU_ITEMS.GROUP.SUBGROUPS',
          url: [`/organizations/${group.voId}/groups/${group.id}/subgroups`],
          activatedRegex: '/organizations/\\d+/groups/\\d+/subgroups$'
        },
        {
          label: 'MENU_ITEMS.GROUP.RESOURCES',
          url: [`/organizations/${group.voId}/groups/${group.id}/resources`],
          activatedRegex: '/organizations/\\d+/groups/\\d+/resources$'
        },
        {
          label: 'MENU_ITEMS.GROUP.APPLICATIONS',
          url: [`/organizations/${group.voId}/groups/${group.id}/applications`],
          activatedRegex: '/organizations/\\d+/groups/\\d+/applications$'
        },
        {
          label: 'MENU_ITEMS.GROUP.SETTINGS',
          url: [`/organizations/${group.voId}/groups/${group.id}/settings`],
          activatedRegex: '/organizations/\\d+/groups/\\d+/settings$',
          children: [
            {
              label: 'MENU_ITEMS.GROUP.ATTRIBUTES',
              url: [`/organizations/${group.voId}/groups/${group.id}/settings/attributes`],
              activatedRegex: '/organizations/\\d+/groups/\\d+/settings/attributes$'
            },
            {
              label: 'MENU_ITEMS.GROUP.EXPIRATION',
              url: [`/organizations/${group.voId}/groups/${group.id}/settings/expiration`],
              activatedRegex: '/organizations/\\d+/groups/\\d+/settings/expiration$'
            },
            {
              label: 'MENU_ITEMS.GROUP.MANAGERS',
              url: [`/organizations/${group.voId}/groups/${group.id}/settings/managers`],
              activatedRegex: '/organizations/\\d+/groups/\\d+/settings/managers$'
            },
            {
              label: 'MENU_ITEMS.GROUP.APPLICATION_FORM',
              url: [`/organizations/${group.voId}/groups/${group.id}/settings/applicationForm`],
              activatedRegex: '/organizations/\\d+/groups/\\d+/settings/applicationForm$'
            },
            {
              label: 'MENU_ITEMS.GROUP.NOTIFICATIONS',
              url: [`/organizations/${group.voId}/groups/${group.id}/settings/notifications`],
              activatedRegex: '/organizations/\\d+/groups/\\d+/settings/notifications$'
            },
          ],
          showChildrenRegex: '/organizations/\\d+/groups/\\d+/settings'
        }
      ],
      colorClass: 'group-item',
      icon: 'group-white.svg',
      // labelClass: 'group-text',
      activatedClass: 'group-item-activated',
      linksClass: 'group-item-links'
    };
  }

  parseVo(vo: Vo): SideMenuItem {
    return {
      label: vo.name,
      baseLink: [`/organizations/${vo.id}`],
      links: this.getVoLinks(vo),
      colorClass: 'vo-item',
      icon: 'vo-white.svg',
      // labelClass: 'vo-text',
      activatedClass: 'vo-item-activated',
      linksClass: 'vo-item-links'
    };
  }

  parseMember(member: RichMember): SideMenuItem {
    return {
      label: parseFullName(member.user),
      baseLink: [`/organizations/${member.voId}/members/${member.id}`],
      links: [
        {
          label: 'MENU_ITEMS.MEMBER.OVERVIEW',
          url: [`/organizations/${member.voId}/members/${member.id}`],
          activatedRegex: '/organizations/\\d+/members/\\d+$'
        },
        {
          label: 'MENU_ITEMS.MEMBER.GROUPS',
          url: [`//organizations/${member.voId}/members/${member.id}/groups`],
          activatedRegex: '/organizations/\\d+/members/\\d+/groups'
        },
        {
          label: 'MENU_ITEMS.MEMBER.SETTINGS',
          url: [`/organizations/${member.voId}/members/${member.id}/settings`],
          activatedRegex: '/organizations/\\d+/members/\\d+/settings$',
          children: [
            {
              label: 'MENU_ITEMS.MEMBER.ATTRIBUTES',
              url: [`/organizations/${member.voId}/members/${member.id}/settings/attributes`],
              activatedRegex: '/organizations/\\d+/members/\\d+/settings/attributes$'
            }
          ],
          showChildrenRegex: '/organizations/\\d+/members/\\d+/settings'
        }
      ],
      colorClass: 'member-item',
      icon: 'user-white.svg',
      // labelClass: 'member-text',
      activatedClass: 'member-item-activated',
      linksClass: 'member-item-links'
    };
  }

  parseUser(user: User, path: string, regex: string): SideMenuItem {
    return {
      label: parseFullName(user),
      baseLink: [path],
      links: [
        {
          label: 'MENU_ITEMS.USER.OVERVIEW',
          url: [path],
          activatedRegex: `${regex}$`
        },
        {
          label: 'MENU_ITEMS.USER.DETAIL',
          url: [`${path}/detail`],
          activatedRegex: `${regex}/detail`
        },
        {
          label: 'MENU_ITEMS.USER.ORGANIZATIONS',
          url: [`${path}/organizations`],
          activatedRegex: `${regex}/organizations`
        },
        {
          label: 'MENU_ITEMS.USER.GROUPS',
          url: [`${path}/groups`],
          activatedRegex: `${regex}/groups`
        },
        {
          label: 'MENU_ITEMS.USER.SETTINGS',
          url: [`${path}/settings`],
          activatedRegex: `${regex}/settings$`,
          children: [
            {
              label: 'MENU_ITEMS.MEMBER.ATTRIBUTES',
              url: [`${path}/settings/attributes`],
              activatedRegex: `${regex}/settings/attributes`
            }
          ],
          showChildrenRegex: `${regex}/settings`
        },
      ],
      colorClass: 'user-bg-color',
      icon: 'user-white.svg',
      activatedClass: 'user-item-activated',
      linksClass: 'user-item-links'
    };
  }

  getVoLinks(vo: Vo): EntityMenuLink[] {
    const links: EntityMenuLink[] = [];

    // Overview
    links.push({
      label: 'MENU_ITEMS.VO.OVERVIEW',
      url: [`/organizations/${vo.id}`],
      activatedRegex: '/organizations/\\d+$'
    });

    // Members
    if (this.authResolver.isThisVoAdminOrObserver(vo.id)) {
      links.push({
        label: 'MENU_ITEMS.VO.MEMBERS',
        url: [`/organizations/${vo.id}/members`],
        activatedRegex: '/organizations/\\d+/members$'
      });
    }

    // Groups
    if (this.authResolver.isThisVoAdminOrObserver(vo.id)
      || this.authResolver.isGroupAdminInThisVo(vo.id)) {
      links.push({
        label: 'MENU_ITEMS.VO.GROUPS',
        url: [`/organizations/${vo.id}/groups`],
        activatedRegex: '/organizations/\\d+/groups$'
      });
    }

    // Resource management
    if (this.authResolver.isThisVoAdminOrObserver(vo.id)) {
      links.push({
        label: 'MENU_ITEMS.VO.RESOURCES',
        url: [`/organizations/${vo.id}/resources`],
        activatedRegex: '/organizations/\\d+/resources$',
        children: [
          {
            label: 'MENU_ITEMS.VO.RESOURCE_PREVIEW',
            url: [`/organizations/${vo.id}/resources/preview`],
            activatedRegex: '/organizations/\\d+/resources/preview$'
          },
          {
            label: 'MENU_ITEMS.VO.RESOURCE_TAGS',
            url: [`/organizations/${vo.id}/resources/tags`],
            activatedRegex: '/organizations/\\d+/resources/tags$'
          },
          {
            label: 'MENU_ITEMS.VO.RESOURCE_STATES',
            url: [`/organizations/${vo.id}/resources/states`],
            activatedRegex: '/organizations/\\d+/resources/states$'
          }
        ],
        showChildrenRegex: '/organizations/\\d+/resources'
      });
    }

    // Applications
    if (this.authResolver.isThisVoAdminOrObserver(vo.id)) {
      links.push({
        label: 'MENU_ITEMS.VO.APPLICATIONS',
        url: [`/organizations/${vo.id}/applications`],
        activatedRegex: '/organizations/\\d+/applications'
      });
    }

    // Settings
    if (this.authResolver.isThisVoAdminOrObserver(vo.id)) {
      links.push({
        label: 'MENU_ITEMS.VO.SETTINGS',
        url: [`/organizations/${vo.id}/settings`],
        activatedRegex: '/organizations/\\d+/settings$',
        children: [
          {
            label: 'MENU_ITEMS.VO.ATTRIBUTES',
            url: [`/organizations/${vo.id}/settings/attributes`],
            activatedRegex: '/organizations/\\d+/settings/attributes$'
          },
          {
            label: 'MENU_ITEMS.VO.EXPIRATION',
            url: [`/organizations/${vo.id}/settings/expiration`],
            activatedRegex: '/organizations/\\d+/settings/expiration$'
          },
          {
            label: 'MENU_ITEMS.VO.MANAGERS',
            url: [`/organizations/${vo.id}/settings/managers`],
            activatedRegex: '/organizations/\\d+/settings/managers$'
          },
          {
            label: 'MENU_ITEMS.VO.APPLICATION_FORM',
            url: [`/organizations/${vo.id}/settings/applicationForm`],
            activatedRegex: '/organizations/\\d+/settings/applicationForm$'
          },
          {
            label: 'MENU_ITEMS.VO.NOTIFICATIONS',
            url: [`/organizations/${vo.id}/settings/notifications`],
            activatedRegex: '/organizations/\\d+/settings/notifications$'
          }
        ],
        showChildrenRegex: '/organizations/\\d+/settings'
      });
    }

    return links;
  }
}
