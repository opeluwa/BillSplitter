import {Pipe, PipeTransform} from '@angular/core';
import {AuthService} from '../Shared/auth.service';

@Pipe({
  name: 'filterPay'
})

export class FilterpayPipe implements PipeTransform {  // pipe filters array for only those that hav not been paid for
    transform(data: any, search: any): any {
        return data.filter((item) => {
          return item.paid === search;
        });
    }
  }
