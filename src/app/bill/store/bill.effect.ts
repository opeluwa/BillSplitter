import {Actions, Effect, ofType} from '@ngrx/effects';
import * as billActions from './bill.action';
import {catchError, exhaustMap, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {UserBillModel} from '../../Shared/userBill.model';
import {BillModel} from '../../Shared/bill.model';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../AppStore/app.reducer';
import {of} from 'rxjs';
import {PaidModel} from '../../Shared/paid.model';
import {MyActiveModel} from '../../Shared/myActive.model';
const BACKEND_URL_BILL = environment.apiUrl + '/bills';

const billSorter = (bills) => { // sorts bills into two arrays, either fully paid or still needs payments.
                              // also stores who need to still pay.
  const myActiveBills = [];
  const paidBills = [];
  bills.map(arrays => {
    const usersWhoNeedToPay = [];  // list of users who still need to pay
    arrays.billUsers.map(users => {
      if (!users.paid) {  // if user hasnt paid add to array
        usersWhoNeedToPay.push(users.email);
      }
    });
    const bill = new PaidModel(arrays._id, arrays.billName, arrays.billUsers, arrays.cost, arrays.dateCreated,
      arrays.dateDue, arrays.partyId, arrays.description, arrays.numOfPayers, arrays.imagePath);

    usersWhoNeedToPay.length > 0 ? myActiveBills.push(new MyActiveModel(bill, usersWhoNeedToPay)) :
      paidBills.push(bill);
  });

  return new billActions.billSuccess({myActiveBills, paidBills});

};

export class BillEffect {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
@Effect()
  billFetch = this.actions$.pipe(ofType(billActions.BILL_FETCH_START), switchMap( () => {
    return this.http.get<{message: string, content: any[]}>(BACKEND_URL_BILL + '/myBills').pipe(take(1),
      map((httpData: {message: string, content: any[]}) => {
      return httpData.content;
    }), map(bills => {
      return billSorter(bills); // sort the  bills
    }), catchError(err => { return this.connectionHandler(); }));
  }));

  @Effect()
  billFetch2 = this.actions$.pipe(ofType(billActions.BILL_FETCH_SUCCESS), switchMap(() => {
    return this.http.get<any>(BACKEND_URL_BILL).pipe(take(1), map(data => {
      const bill: UserBillModel[] = [];
      data.content.map( bills => { // put each bill, into a billModel
        const mainBill = new BillModel(bills.billId._id, bills.billId.billName, bills.billId.cost,
          bills.billId.dateCreated, bills.billId.dateDue, bills.billId.partyId, bills.billId.userId,
          bills.billId.description, +bills.billId.numOfPayers, bills.billId.imagePath);
        bill.push(new UserBillModel(mainBill, bills._id, bills.paid));
      });
      return bill;
    }), map(bills => {
      return new billActions.billFinish(bills);
    }, catchError(err => {
      return this.connectionHandler(); })));
}));

@Effect()
  billAdd = this.actions$.pipe(ofType(billActions.NEW_BILL), withLatestFrom(this.store.select('bill')),
    switchMap(([data, stateData]) => {
      return this.http.post<any>(BACKEND_URL_BILL, stateData.billToAdd).pipe(take(1), map(http => {
      return new billActions.newBillSuccess(); }));
    }), catchError(err => {
      return this.connectionHandler(); }));

@Effect()
  payABill = this.actions$.pipe(ofType(billActions.PAY_BILL), withLatestFrom(this.store.select('bill')),
    switchMap(([actionData, stateData]) => {
    return this.http.put(BACKEND_URL_BILL + '/paybill', stateData.paidBillReplacement).pipe(take(1),
      map(() => {
        return new billActions.payBillSuccess();
      }), catchError(err => {
        return this.connectionHandler(); }));

  }));

  @Effect({dispatch: false})
  billFailure = this.actions$.pipe(ofType(billActions.BILL_FETCH_FAILURE),
    tap((actionData: billActions.billFetchFailure) => {
      alert(actionData.payload);
  }), switchMap(() => {
      return of({dummy: 'data'});  // return noting
}));

  connectionHandler() {
    return this.store.select('system').pipe(take(1),
      exhaustMap( systemData => { // returns error bassed on whether server issues or client issue
      if (!systemData.connected) {
        return of(new billActions.billFetchFailure('Device is not connected to the internet. Please connect and try again.'));
      } else {
        return of(new billActions.billFetchFailure('Server side error, please try again later.'));
      }
    }));
  }
}
