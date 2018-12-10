import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  random() {
    const r = function () { return Math.floor(Math.random() * 256); };
    return 'rgb(' + r() + ',' + r() + ',' + r() + ')';
  }
}
