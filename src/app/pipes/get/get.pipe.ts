import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'get'
})
export class GetPipe implements PipeTransform {

  transform(value: any, index?: any): any {
    if (index == null) index = 0;
    return value[index]
  }

}
