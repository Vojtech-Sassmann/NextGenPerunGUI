import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {SideMenuItem} from '../side-menu.component';
import {openClose} from '../../animations/Animations';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-side-menu-root-item',
  templateUrl: './side-menu-root-item.component.html',
  styleUrls: ['./side-menu-root-item.component.scss'],
  animations: [
    openClose
  ]
})
export class SideMenuRootItemComponent implements OnInit, OnChanges {

  private currentUrl: string;

  constructor(
    private router: Router
  ) {
    this.currentUrl = router.url;

    router.events.subscribe((_: NavigationEnd) => {
      if (_ instanceof NavigationEnd) {
        this.currentUrl = _.url;
      }
    });
  }

  @Input()
  item: SideMenuItem;

  @Input()
  index: number;

  @Input()
  showOpen: boolean;

  @ViewChild('collapse', { static: false }) collapseDiv: ElementRef;

  expanded = false;

  @Input()
  sideNav: MatSidenav;
  ngOnInit() {
    this.expanded = this.showOpen;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.expanded = this.showOpen;
  }

  toggle() {
    if (this.item.baseLink !== undefined) {
      this.navigate(this.item.baseLink);
    } else {
      this.expanded = !this.expanded;
    }
  }

  isActive(currentUrl: string, regexValue: string) {
    const regexp = new RegExp(regexValue);

    return regexp.test(currentUrl);
  }

  getBgClass() {
    if (this.item.baseColorClass) {
      return this.isActive(this.currentUrl, this.item.baseColorClassRegex) ? this.item.colorClass : this.item.baseColorClass;
    } else {
      return this.item.colorClass;
    }
  }

  navigate(url) {
    if (this.sideNav.mode === 'over') {
      this.sideNav.close().then(() => this.router.navigate(url));
    } else {
      this.router.navigate(url);
    }
  }
}
