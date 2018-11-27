import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'append'
})
export class AppendPipe implements PipeTransform {

  transform(val1: string, val2: string): any {
    return val1.concat(val2);
  }

}
