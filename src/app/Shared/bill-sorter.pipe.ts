import { Pipe, PipeTransform } from '@angular/core';
import {UserBillModel} from './userBill.model';
import {PaidModel} from './paid.model';
import {MyActiveModel} from './myActive.model';

@Pipe({
  name: 'billSorter',
  pure: false
})
export class BillSorterPipe implements PipeTransform {

  transform(value: PaidModel[] | UserBillModel[], search: number): any {
    const array = value;
    const instanceCheck = this.checkInstance(array);
    if (instanceCheck === 0) {  // type is of UserBillModel[]
      return array.sort((n1, n2) => {
        const n1DateDue = Math.abs(n1.mainBill.dateDue);
        const n2DateDue = Math.abs(n2.mainBill.dateDue);
        const n1billName = n1.mainBill.billName.toLowerCase();
        const n2billName = n2.mainBill.billName.toLowerCase();
        const n1SharedCost = n1.mainBill.cost / n1.mainBill.numOfPayers;
        const n2SharedCost = +n2.mainBill.cost / +n1.mainBill.numOfPayers;
        if (search === 1) {
          return n1DateDue < n2DateDue ? -1 : 1;
        } else if (search === 2) {
          return n1DateDue > n2DateDue ? -1 : 1;
        } else if (search === 3) {
          return n1billName < n2billName ? -1 : 1;
        } else if (search === 4) {
          return n1SharedCost < n2SharedCost ? -1 : 1;
        } else if (search === 5) {
          return n1SharedCost > n2SharedCost ? -1 : 1;
        }
      });
    } else if (instanceCheck === 1) {  // type is of PaidModel[]
        return array.sort((n1, n2) => {
          const n1DateDue = Math.abs(n1.dateDue);
          const n2DateDue = Math.abs(n2.dateDue);
          const n1billName = n1.billName.toLowerCase();
          const n2billName = n2.billName.toLowerCase();
          const n1SharedCost = n1.cost / n1.numOfPayers;
          const n2SharedCost = n2.cost / n2.numOfPayers;
          if (search === 1) {
            return n1DateDue < n2DateDue ? -1 : 1;
          } else if (search === 2) {
            return n1DateDue > n2DateDue ? -1 : 1;
          } else if (search === 3) {
            return n1billName < n2billName ? -1 : 1;
          } else if (search === 4) {
            return n1SharedCost < n2SharedCost ? -1 : 1;
          } else if (search === 5) {
            return n1SharedCost > n2SharedCost ? -1 : 1;
          }
        });
    }
  }

  checkInstance(value: PaidModel[] | UserBillModel[]) {
    if (value.length > 0) {
      if (value instanceof Array) {
        if (value[0] instanceof UserBillModel || value[0] instanceof MyActiveModel) {  // use the same datatype
          return 0;
        } else if (value[0] instanceof PaidModel) {
          return 1;
        } else {
          return -1;
        }
      }
    } else {
      return -1;   // returns -1 if data is not paidModel or UserBillModel
    }
  }
}
