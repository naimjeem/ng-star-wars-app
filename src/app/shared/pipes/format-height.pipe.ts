import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHeight'
})
export class FormatHeightPipe implements PipeTransform {

  transform(value: string | any): string {
    const height = parseInt(value);
    if (height > 200) {
      return 'High';
    } else if (height > 100 && height < 200) {
      return 'Normal';
    } else if (height < 100) {
      return 'Low';
    } else {
      return 'High';
    }
  }

}
