import {Component, Inject, OnInit} from '@angular/core';
import {RPCError} from '../../../core/models/RPCError';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {RtMessagesService} from '../../../core/services/api/rt-messages.service';
import {NotificatorService} from '../../../core/services/common/notificator.service';


export interface BugReportData {
  error: RPCError;
}

@Component({
  selector: 'app-bug-report-dialog',
  templateUrl: './bug-report-dialog.component.html',
  styleUrls: ['./bug-report-dialog.component.scss']
})
export class BugReportDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BugReportDialogComponent>,
    private translate: TranslateService,
    private notificator: NotificatorService,
    private rtMessages: RtMessagesService,
    @Inject(MAT_DIALOG_DATA) public data: BugReportData
  ) { }

  message = '';
  subject = '';
  methodRegexp = /(\w+\/\w+)$/g;

  ngOnInit() {
    if (this.data.error && this.data.error.errorId) {
      this.subject = this.translate.instant('DIALOGS.BUG_REPORT.SUBJECT_VALUE') +
        this.parseMethod(this.data.error.call) + ' (' + this.data.error.errorId + ')';
    }
  }

  sendBugReport() {
    this.rtMessages.sendMessageToRT('perun', this.subject, this.getFullEmailBody()).subscribe(rtMessage => {
      // TODO show ticket number and email
      this.dialogRef.afterClosed()
        .subscribe(() => this.notificator.showSuccess(this.translate.instant('DIALOGS.BUG_REPORT.SUCCESS')));
      this.dialogRef.close();
    });
  }

  private parseMethod(url: string): string {
    if (!url) {
      return url;
    }
    return this.methodRegexp.exec(url)[1];
  }

  getFullEmailBody(): string {
    return this.message + '\n' +
      '------------------------\n' +
      'Technical details:\n\n' +
      this.data.error.errorId + ' ' + this.data.error.type + '\n' +
      this.data.error.message + '\n' +

      // TODO add instance
      'Perun instance: GENERIC\n' +
      'Request:\n' +
      this.data.error.call + '\n\n' +
      'Payload:\n' +
      this.data.error.payload + '\n\n' +

      // TODO add version
      'NEW GUI';

  }
}
