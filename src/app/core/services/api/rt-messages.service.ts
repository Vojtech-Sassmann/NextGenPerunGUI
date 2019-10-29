import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {RTMessage} from '../../models/RTMessage';

@Injectable({
  providedIn: 'root'
})
export class RtMessagesService {

  constructor(
    private apiService: ApiService
  ) { }

  sendMessageToRT(queue: string, subject: string, text: string, showNotification = true): Observable<RTMessage> {
    return this.apiService.post('json/rtMessagesManager/sentMessageToRT', {
      queue: queue,
      subject: subject,
      text: text
    }, showNotification);
  }
}
