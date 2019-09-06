import {PaidModel} from './paid.model';

export class MyActiveModel {
  constructor(public mainBill: PaidModel, public stillDue: string[]) {
  }
}
