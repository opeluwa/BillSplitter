import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import * as billAction from '../bill/store/bill.action';
import * as fromApp from '../AppStore/app.reducer';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {take} from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class ActiveBillResolver implements  Resolve<any> {
  constructor(private store: Store<fromApp.AppState>,
              private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.store.dispatch(new billAction.billFetch());
    return this.actions$.pipe(ofType(billAction.BILL_FETCH_FINISH), take(1));
  }
}
