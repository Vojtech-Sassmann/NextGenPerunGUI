import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VoService} from '../../../core/services/api/vo.service';
import {Vo} from '../../../core/models/Vo';
import {RichMember} from '../../../core/models/RichMember';
import {MembersService} from '../../../core/services/api/members.service';
import {SideMenuItemService} from '../../../shared/side-menu/side-menu-item.service';
import {SideMenuService} from '../../../core/services/common/side-menu.service';
import {AttributesService} from '../../../core/services/api/attributes.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-member-detail-page',
  templateUrl: './member-detail-page.component.html',
  styleUrls: ['./member-detail-page.component.scss']
})
export class MemberDetailPageComponent implements OnInit {

  constructor(
    private sideMenuItemService: SideMenuItemService,
    private attributeService: AttributesService,
    private translate: TranslateService,
    private sideMenuService: SideMenuService,
    private membersService: MembersService,
    private voService: VoService,
    private route: ActivatedRoute,
  ) { }

  vo: Vo;
  member: RichMember;

  fullName = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      const voId = params['voId'];
      const memberId = params['memberId'];

      this.voService.getVoById(voId).subscribe(vo => {
        this.vo = vo;
        this.membersService.getRichMemberWithAttributes(memberId).subscribe(member => {
          this.member = member;
          const voSideMenuItem = this.sideMenuItemService.parseVo(this.vo);
          const memberSideMenuItem = this.sideMenuItemService.parseMember(this.member);
          this.fullName = memberSideMenuItem.label;
          this.sideMenuService.setMenuItems([voSideMenuItem, memberSideMenuItem]);
        });
      });
    });
  }
}
