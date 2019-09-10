import {Component, OnInit} from '@angular/core';
import {SideMenuService} from '../../../core/services/common/side-menu.service';
import {VoService} from '../../../core/services/api/vo.service';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {SideMenuItemService} from '../../../shared/side-menu/side-menu-item.service';
import {Vo} from '../../../core/models/Vo';
import {GroupService} from '../../../core/services/api/group.service';
import {Group} from '../../../core/models/Group';
import {fadeIn} from '../../../shared/animations/Animations';

@Component({
  selector: 'app-group-detail-page',
  templateUrl: './group-detail-page.component.html',
  styleUrls: ['./group-detail-page.component.scss'],
  animations: [
    fadeIn
  ]
})
export class GroupDetailPageComponent implements OnInit {

  constructor(
    private sideMenuService: SideMenuService,
    private voService: VoService,
    private route: ActivatedRoute,
    private sideMenuItemService: SideMenuItemService,
    private groupService: GroupService
  ) {}

  vo: Vo;
  group: Group;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const voId = params['voId'];
      const groupId = params['groupId'];

      this.voService.getVoById(voId).subscribe(vo => {
        this.vo = vo;
        this.groupService.getGroupById(groupId).subscribe(group => {
          this.group = group;
          const voSideMenuItem = this.sideMenuItemService.parseVo(vo);
          const groupSideMenuItem = this.sideMenuItemService.parseGroup(group);

          this.sideMenuService.setAccessMenuItems([voSideMenuItem, groupSideMenuItem]);
        });
      });
    });
  }
}
