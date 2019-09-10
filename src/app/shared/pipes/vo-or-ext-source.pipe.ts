import { Pipe, PipeTransform } from '@angular/core';
import {parseVo} from '../utils';

@Pipe({
  name: 'userVo'
})
export class UserVoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return parseVo(value);
  }

}
