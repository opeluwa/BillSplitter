import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import * as fromApp from '../AppStore/app.reducer';
import {Store} from '@ngrx/store';
import {map, switchMap, take} from 'rxjs/operators';
import * as PartyAction from './store/party.action';
import {Actions, ofType} from '@ngrx/effects';
@Injectable({providedIn: 'root'})
export class PartyResolver implements  Resolve<any> {
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.select('parties').pipe(take(1), map(parties => {
      return parties.parties;
    }), switchMap(parties => {
      this.store.dispatch(new PartyAction.fetchParties());
      return this.actions$.pipe(ofType(PartyAction.SET_PARTIES), take(1));

    }));
  }
}
