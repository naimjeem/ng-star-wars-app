import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatLength'
})
export class FormatLengthPipe implements PipeTransform {

  transform(value: string | any): string {
    const height = parseInt(value);
    if (height > 1000) {
      return 'Large';
    } else if (height > 100 && height < 1000) {
      return 'Normal';
    } else if (height < 100) {
      return 'Small';
    } else {
      return 'Large';
    }
  }

}
