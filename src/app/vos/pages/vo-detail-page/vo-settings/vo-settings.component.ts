import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {fadeIn} from '../../../../shared/animations/Animations';

@Component({
  selector: 'app-vo-settings',
  templateUrl: './vo-settings.component.html',
  styleUrls: ['./vo-settings.component.scss'],
  animations: [
    fadeIn
  ]
})
export class VoSettingsComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUrl = router.url;
    this.backButtonDisplayed = this.backButtonRegex.test(this.currentUrl);

    router.events.subscribe((_: NavigationEnd) => {
      if (_ instanceof NavigationEnd) {
        this.currentUrl = _.url;

        this.backButtonDisplayed = this.backButtonRegex.test(this.currentUrl);
      }
    });
  }

  backButtonRegex = new RegExp('/organizations/\\d+/settings/\\w+$');
  currentUrl;
  backButtonDisplayed = false;

  voId: number;

  ngOnInit(): void {
    this.route.parent.params.subscribe(parentParams => {
      this.voId = parentParams['voId'];
    });
  }
}
