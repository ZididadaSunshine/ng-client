import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'httpError'
})
export class HttpErrorPipe implements PipeTransform {

  transform(error: any): string {
    let message: string;
    
    if (error.error.message) {
      message = error.error.message;
    } else {
      message = error.message;
    }

    return message;
  }

}
