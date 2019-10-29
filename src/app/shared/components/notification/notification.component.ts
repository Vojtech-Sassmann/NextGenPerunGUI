import {Component, Input, OnInit} from '@angular/core';
import {NotificationData} from '../../models/NotificationData';
import { MatDialog } from '@angular/material/dialog';
import {NotificationDialogComponent} from '../notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  constructor(
    private dialog: MatDialog
  ) { }

  @Input()
  data: NotificationData;

  doAction(): void {
    if (this.data.action !== undefined) {
      this.data.action();
    } else {
      this.dialog.open(NotificationDialogComponent, {
        width: '550px',
        data: this.data,
        autoFocus: false
      });
    }
  }
}
