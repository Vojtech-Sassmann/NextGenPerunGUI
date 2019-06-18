import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameSpaceToDef'
})
export class NameSpaceToDefPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === null) {
      return null;
    }

    const stringValue = <string>value;
    return stringValue.substring(stringValue.lastIndexOf(':') + 1, stringValue.length);
  }
}
