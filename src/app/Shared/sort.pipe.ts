import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {

  transform(value: any): any {
    let array = value;
    return array.sort(
      function (n1,n2){
        if( n1['date'] < n2['date']) {
          return -1;
        } else {
          return 1;
        }
      }
    );
  }
}
