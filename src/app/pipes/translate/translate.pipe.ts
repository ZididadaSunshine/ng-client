import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../services/translate/translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translate: TranslateService) { }
  transform(key: string, args?: any[]): string {

    key = key.toLowerCase();
    let translation: string = this.translate.data[key];

    // If no translation was found, attempt to split the key
    const keys = key.split(' ');

    // If there is only one key, set the translation equal to the key
    if (!translation && keys.length === 1) {
      translation = key;
    }

    // If there is still no translation, look for translation fragments and add them to an array
    const translations = [];

    if (!translation) {
      for (let i = 0; i < keys.length; i++) {
        translation = this.translate.data[keys[i]];

        if (!translation && (i + 1) < keys.length) {
          const keyset = [keys[i]];

          for (let j = i + 1; j < keys.length; j++) {
            keyset.push(keys[j]);
            translation = this.translate.data[keyset.join(' ')];

            if (translation) {
              i = j;
              break;
            }
          }
        }

        translations.push(translation || keys[i]);
      }

      translation = translations.join(' ');
    }

    return this.argsReplace(translation, args);
  }


  private argsReplace(translation, args): string {
    if (args) {
      args.forEach(arg => {
        translation = translation.replace('%s', arg);
      });
    }

    return translation;
  }



}
