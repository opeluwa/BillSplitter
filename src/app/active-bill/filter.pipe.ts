import {Pipe, PipeTransform} from '@angular/core';
import {AuthService} from '../Shared/auth.service';

@Pipe({
  name: 'Filterpipe'
})

export class filterPipe implements PipeTransform {
  constructor(private authServ: AuthService) {}
  transform(data: any, search: any): any {
    let array = [];
    array = data;

    return array.filter((item) => {
      return (item.mainBill.userId === this.authServ.getlocalId()) === search;
    });
  }
}
