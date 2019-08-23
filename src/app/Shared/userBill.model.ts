import {BillModel} from './bill.model';

export class UserBillModel {
  constructor(public mainBill: BillModel, public userBillId: string, public paid: Boolean) { }
}
