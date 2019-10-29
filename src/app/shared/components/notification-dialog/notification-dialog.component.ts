import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NotificationData} from '../../models/NotificationData';
import {BugReportDialogComponent} from '../bug-report-dialog/bug-report-dialog.component';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<NotificationDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: NotificationData
  ) { }

  onCloseClick() {
    this.dialogRef.close();
  }

  onBugReportClick() {
    this.dialogRef.afterClosed().subscribe(() => {
      this.dialog.open(BugReportDialogComponent, {
        width: '550px',
        data: {
          error: this.data.error,
        },
        autoFocus: false
      });
    });
    this.dialogRef.close();
  }
}
