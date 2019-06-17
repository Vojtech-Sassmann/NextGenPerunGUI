import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Vo} from '../../core/models/Vo';
import {SideMenuItem} from './side-menu.component';
import {Group} from '../../core/models/Group';
import {RichMember} from '../../core/models/RichMember';
import {parseFullName} from '../utils';

@Injectable({
  providedIn: 'root'
})
export class SideMenuItemService {

  constructor(
    private translate: TranslateService,
  ) { }

  parseGroup(group: Group): SideMenuItem {
    return {
      baseLink: `/organizations/${group.voId}/groups/${group.id}`,
      label: group.name,
      links: [
        {
          label: this.translate.instant('MENU_ITEMS.GROUP.OVERVIEW'),
          url: [`/organizations/${group.voId}/groups/${group.id}`],
          activatedRegex: '/organizations/\\d+/groups/\\d+$'
        },
        {
          label: this.translate.instant('MENU_ITEMS.GROUP.MEMBERS'),
          url: [`/organizations/${group.voId}/groups/${group.id}/members`],
          activatedRegex: '/organizations/\\d+/groups/\\d+/members$'
        },
        {
          label: this.translate.instant('MENU_ITEMS.GROUP.SUBGROUPS'),
          url: [`/organizations/${group.voId}/groups/${group.id}/subgroups`],
          activatedRegex: '/organizations/\\d+/groups/\\d+/subgroups$'
        },
        {
          label: this.translate.instant('MENU_ITEMS.GROUP.RESOURCES'),
          url: [`/organizations/${group.voId}/groups/${group.id}/resources`],
          activatedRegex: '/organizations/\\d+/groups/\\d+/resources$'
        },
        {
          label: this.translate.instant('MENU_ITEMS.GROUP.APPLICATIONS'),
          url: [`/organizations/${group.voId}/groups/${group.id}/applications`],
          activatedRegex: '/organizations/\\d+/groups/\\d+/applications$'
        },
        {
          label: this.translate.instant('MENU_ITEMS.GROUP.SETTINGS'),
          url: [`/organizations/${group.voId}/groups/${group.id}/settings`],
          activatedRegex: '/organizations/\\d+/groups/\\d+/settings$'
        }
      ],
      colorClass: 'group-bg-color',
      icon: 'group-white.svg'
    };
  }

  parseVo(vo: Vo): SideMenuItem {
    return {
      baseLink: `/organizations/${vo.id}`,
      label: vo.name,
      links: [
        {
          label: this.translate.instant('MENU_ITEMS.VO.OVERVIEW'),
          url: [`/organizations/${vo.id}`],
          activatedRegex: '/organizations/\\d+$'
        },
        {
          label: this.translate.instant('MENU_ITEMS.VO.MEMBERS'),
          url: [`/organizations/${vo.id}/members`],
          activatedRegex: '/organizations/\\d+/members$'
        },
        {
          label: this.translate.instant('MENU_ITEMS.VO.GROUPS'),
          url: [`/organizations/${vo.id}/groups`],
          activatedRegex: '/organizations/\\d+/groups$'
        },
        {
          label: this.translate.instant('MENU_ITEMS.VO.RESOURCES'),
          url: [`/organizations/${vo.id}/resources`],
          activatedRegex: '/organizations/\\d+/resources'
        },
        {
          label: this.translate.instant('MENU_ITEMS.VO.APPLICATIONS'),
          url: [`/organizations/${vo.id}/applications`],
          activatedRegex: '/organizations/\\d+/applications$'
        },
        {
          label: this.translate.instant('MENU_ITEMS.VO.SETTINGS'),
          url: [`/organizations/${vo.id}/settings`],
          activatedRegex: '/organizations/\\d+/settings$',
          children: [
            {
              label: this.translate.instant('MENU_ITEMS.VO.ATTRIBUTES'),
              url: [`/organizations/${vo.id}/settings/attributes`],
              activatedRegex: '/organizations/\\d+/settings/attributes$'
            },
            {
              label: this.translate.instant('MENU_ITEMS.VO.EXPIRATION'),
              url: [`/organizations/${vo.id}/settings/expiration`],
              activatedRegex: '/organizations/\\d+/settings/expiration$'
            }
          ],
          showChildrenRegex: '/organizations/\\d+/settings'
        }
      ],
      colorClass: 'vo-bg-color',
      icon: 'vo-white.svg'
    };
  }

  parseMember(member: RichMember): SideMenuItem {
    return {
      baseLink: `/organizations/${member.voId}/members/${member.id}`,
      label: parseFullName(member.user),
      links: [
        {
          label: this.translate.instant('MENU_ITEMS.MEMBER.OVERVIEW'),
          url: [`/organizations/${member.voId}/members/${member.id}`],
          activatedRegex: '/organizations/\\d+/members/\\d+$'
        },
        {
          label: this.translate.instant('MENU_ITEMS.MEMBER.GROUPS'),
          url: [`//organizations/${member.voId}/members/${member.id}/groups`],
          activatedRegex: '/organizations/\\d+/members/\\d+/groups'
        }
      ],
      colorClass: 'member-bg-color',
      icon: 'user-white.svg'
    };
  }
}
