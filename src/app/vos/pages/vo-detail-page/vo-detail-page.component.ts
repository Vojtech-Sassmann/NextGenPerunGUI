import {Component, OnInit} from '@angular/core';
import {SideMenuService} from '../../../core/services/common/side-menu.service';
import {VoService} from '../../../core/services/api/vo.service';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {Vo} from '../../../core/models/Vo';
import {SideMenuItemService} from '../../../shared/side-menu/side-menu-item.service';
import {fadeIn} from '../../../shared/animations/Animations';
import {addRecentlyVisited} from '../../../shared/utils';

@Component({
  selector: 'app-vo-detail-page',
  templateUrl: './vo-detail-page.component.html',
  styleUrls: ['./vo-detail-page.component.scss'],
  animations: [
    fadeIn
  ]
})
export class VoDetailPageComponent implements OnInit {

  constructor(
    private sideMenuService: SideMenuService,
    private voService: VoService,
    private route: ActivatedRoute,
    private router: Router,
    private sideMenuItemService: SideMenuItemService,
  ) { }

  vo: Vo;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const voId = params['voId'];

      this.voService.getVoById(voId).subscribe(vo => {
        this.vo = vo;

        const sideMenuItem = this.sideMenuItemService.parseVo(vo);

        this.sideMenuService.setAccessMenuItems([sideMenuItem]);

        addRecentlyVisited('vos', this.vo);
      });
    });
  }
}
