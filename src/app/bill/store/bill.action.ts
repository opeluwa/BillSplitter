import {UserBillModel} from '../../Shared/userBill.model';

export const BILL_FETCH_START = '[BILL] BILL_FETCH_START';
export const BILL_FETCH_SUCCESS = '[BILL] BILL_FETCH';
export const BILL_FETCH_FAILURE = '[BILL] BILL_FETCH_FAILURE';
export const BILL_FETCH_FINISH = '[BILL] BILL_FETCH_FINISH';
export const NEW_BILL = '[BILL] NEW_BILL';
export const NEW_BILL_SUCCESS = '[BILL] NEW_BILL_SUCCESS';
export const PAY_BILL = '[BILL] PAY_BILL';
export const PAY_BILL_SUCCESS = '[BILL] PAY_BILL_SUCCESS';
export const PAY_BILL_FAILURE = '[BILL] PAY_BILL_FAILURE';

export class payBillFailure {
  readonly type = PAY_BILL_FAILURE;
  constructor(public payload: string) {}
}

export class billFetchFailure {
  readonly type = BILL_FETCH_FAILURE;
  constructor(public payload: string) {}
}

export class billFetch {
  readonly type = BILL_FETCH_START;
}


export class billSuccess {
  readonly type = BILL_FETCH_SUCCESS;
  constructor(public payload: {myActiveBills: any[], paidBills: any[]}) {}
}

export class payBillSuccess {
  readonly type = PAY_BILL_SUCCESS;
}

export class newBill {
  readonly type = NEW_BILL;
  constructor(public payload: FormData) {}
}

export class newBillSuccess {
  readonly type = NEW_BILL_SUCCESS;
}

export class payBill {
  readonly type = PAY_BILL;
  constructor(public payload: {index: number}) {}
}

export class billFinish {
  readonly type = BILL_FETCH_FINISH;
  constructor(public payload: UserBillModel[]) {}
}
export type billAction = billFetch | billSuccess | billFinish |
  newBill | newBillSuccess | payBill | payBillSuccess | payBillFailure | billFetchFailure;
