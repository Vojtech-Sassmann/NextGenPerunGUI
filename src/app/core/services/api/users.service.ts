import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {RichUser} from '../../models/RichUser';
import {parseUrnsToUrlParam} from '../../../shared/utils';
import {User} from '../../models/User';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private apiService: ApiService
  ) { }

  findRichUsersWithAttributes(searchString: string, attributes: string[], showNotificationOnError = true): Observable<RichUser[]> {
    const attrParam = parseUrnsToUrlParam('attrsNames', attributes);
    return this.apiService.get(`json/usersManager/findRichUsersWithAttributes?searchString=${searchString}${attrParam}`,
      new HttpParams(), showNotificationOnError);
  }

  getUserById(userId: number, showNotificationOnError = true): Observable<User> {
    return this.apiService.get(`json/usersManager/getUserById?id=${userId}`, new HttpParams(), showNotificationOnError);
  }

  findUsers(searchstring: string, showNotificationOnError = true): Observable<User[]> {
    return this.apiService.post('json/usersManager/findUsers', {
      'searchString': searchstring
    }, showNotificationOnError);
  }

  findRichUsers(searchString: string, showNotificationOnError = true): Observable<RichUser[]> {
    return this.apiService.post('json/usersManager/findRichUsers', {
      searchString: searchString
    }, showNotificationOnError);
  }

  getRichUser(userId: number, showNotificationOnError = true): Observable<RichUser> {
    return this.apiService.get(`json/usersManager/getRichUser?id=${userId}`, new HttpParams(), showNotificationOnError);
  }
}
