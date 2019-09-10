import {Pipe, PipeTransform} from '@angular/core';
import {parseUserEmail} from '../utils';

@Pipe({
  name: 'userEmail'
})
export class UserEmailPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return parseUserEmail(value);
  }
}
