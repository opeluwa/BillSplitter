import {BillModel} from '../../Shared/bill.model';
import * as billAction from './bill.action';
import {BILL_FETCH_SUCCESS} from './bill.action';
import {UserBillModel} from '../../Shared/userBill.model';
import {NEW_BILL_SUCCESS} from './bill.action';
import {PaidModel} from '../../Shared/paid.model';
import {MyActiveModel} from '../../Shared/myActive.model';


interface replacement {
  _id: string;
  partyId: number;
  accepted: boolean; // mark bill as paid
  groupName: string;
  billId: number;
}

export interface State {
  bills: UserBillModel[];
  myActiveBills: MyActiveModel[];
  paidBills: PaidModel[];
  indexToPay: number;
  billToAdd: any;
  paidBillReplacement: replacement;
  isLoading: boolean;
}

const initialState: State = {
  bills: [],
  indexToPay: -1,
  myActiveBills: [],
  paidBills: [],
  billToAdd: null,
  paidBillReplacement: null,
  isLoading: false
};

export function billReducer(state: State = initialState, action: billAction.billAction ) {
  switch (action.type) {
    case billAction.BILL_FETCH_START:
      return {
        ...state,
        isLoading: true
      };
    case billAction.BILL_FETCH_SUCCESS:
      return {
        ...state,
        myActiveBills: action.payload.myActiveBills,
        paidBills: action.payload.paidBills,
        isLoading: false
      };
    case billAction.BILL_FETCH_FINISH:
      return {
        ...state,
        bills: action.payload,
        isLoading: false
      };
    case billAction.PAY_BILL:
      const payThisBill: replacement  = {  // this is the replacement object that will be set in the server
        _id: state.bills[action.payload.index].userBillId,
        partyId: state.bills[action.payload.index].mainBill.partyId,
        accepted: true,
        groupName: state.bills[action.payload.index].mainBill.billName,
        billId: state.bills[action.payload.index].mainBill.Id
      };
      return {
        ...state,
        indexToPay: action.payload.index,
        paidBillReplacement: payThisBill,
        isLoading: true
      };

    case billAction.PAY_BILL_SUCCESS:
      const newBillsLeft = [...state.bills];
      newBillsLeft[state.indexToPay].paid = true; // set the bill to as paid

      const newActiveBills = [...state.myActiveBills]; // get original bills that they own

      const MyActiveBillIndex = state.myActiveBills.findIndex(x =>
        x.mainBill.id === newBillsLeft[state.indexToPay].mainBill.Id);
      // get from the index paid users own posts, from the bills they own array

      if (MyActiveBillIndex >= 0) { // if they own the bill
        const emails = newActiveBills[MyActiveBillIndex].stillDue.filter(item => {
          return item !== JSON.parse(localStorage.getItem('user')).email; // filter out the users own email address
        });
        newActiveBills[MyActiveBillIndex].stillDue = emails; // set the new emails
      }
      return {
        ...state,
        bills: [...newBillsLeft],
        myActiveBills: [...newActiveBills],
        isLoading: false
      };

    case billAction.NEW_BILL:
      return {
        ...state,
        billToAdd: action.payload,
        isLoading: true
      };
    case billAction.NEW_BILL_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case billAction.BILL_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return {
        ...state
      };
  }
}
