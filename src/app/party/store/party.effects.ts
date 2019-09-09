import {Actions, Effect, ofType} from '@ngrx/effects';
import * as partyAction from './party.action';
import {Injectable} from '@angular/core';
import {catchError, exhaustMap, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RecivedPartyModel} from '../recivedParty.model';
import * as fromParty from './party.reducer';
import {of} from 'rxjs';
import * as fromApp from '../../AppStore/app.reducer';
import {Store} from '@ngrx/store';
const BACKEND_URL_PARTIES = environment.apiUrl + '/parties';

const addPartyToList = (data, partyState: fromParty.State) => {
  const newParty = new RecivedPartyModel(data.id, data.Party, data.user, data.accepted,
    data.groupName, data.userEmail);  // package recevied data
  return new partyAction.addPartiesSuccess(newParty);
};

const handleError = (error) => {
  console.log('failure');
  if (!error.error.message) {
    alert('Issue communicating with server, try again later');
  }
  return error.error.message ?
    new partyAction.addPartiesFailed(error.error.message) :
    new partyAction.addPartiesFailed('Issue communicating with server, try again later');
};

const leavePartyHandleError = (error) => {
  return error.error.message ?
 new partyAction.leavePartyFail(error.error.message) :
    new partyAction.leavePartyFail('Issue communicating with server, try again later');

};

@Injectable()
export class PartyEffect {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
  @Effect()
  fetchParties = this.actions$.pipe(ofType(partyAction.FETCH_PARTIES),
    switchMap(fetchAction => {
      return this.http.get<{message: string, posts: any}>(BACKEND_URL_PARTIES).
      pipe(take(1), map(parties => {
        return parties.posts.map( post => {
          return{
            groupName: post.groupName,
            user: post.user,
            userEmail: post.partyId.userEmail,
            id: post._id,
            Party: post.partyId,
            accepted: post.accepted
          };
        });
      }), map((finishedParties: RecivedPartyModel[]) => {
        return new partyAction.setParties(finishedParties);
      }), catchError(err => { return this.fetchConnectionHandler(); }));
    })
    );

  @Effect()
  addPartiesStart = this.actions$.pipe(ofType(partyAction.ADD_PARTY_START), map(() => {
    return new partyAction.addParties();
  }));

@Effect()
  addParties = this.actions$.pipe(ofType(partyAction.ADD_PARTY), withLatestFrom(this.store.select('parties')),
    switchMap(([action, partyState]) => {
    return this.http.post<{message: string, content: any}>(BACKEND_URL_PARTIES,
      {groupName: partyState.partyToAddName, userEmail: partyState.partyToAddEmail}).pipe(take(1),
        withLatestFrom(this.store.select('parties')), map(([data, partyState]) => {
      return addPartyToList(data.content, partyState);
    }), catchError(error => {
        console.log('failure');
        return this.connectionHandler(error, true);
    })); })); // do error case on request

  @Effect({dispatch: false})
  addPartiesFinished = this.actions$.pipe(ofType(partyAction.ADD_PARTY_SUCCESS), map(data => {
    return of(data);
  }));

  @Effect()
  leaveParty = this.actions$.pipe(ofType(partyAction.LEAVE_PARTY_START),
    switchMap((data: partyAction.leaveParty) => {
    return this.http.post<{ message: string}>(BACKEND_URL_PARTIES
      + '/leave/' + data.payload.id, data.payload).pipe(take(1), map(() => {
        return new partyAction.leavePartySuccess();
    }), catchError(error => {
      return this.connectionHandler(error, false);
    }));
  }));

  @Effect({dispatch: false})
  fetchPartyError = this.actions$.pipe(ofType(partyAction.FETCH_PARTIES_FAILURE),
    tap((actionData: partyAction.fetchPartyFailure) => {
      alert(actionData.payload);
    }), switchMap(() => {
      return of({dummy: 'data'});
    }));

  connectionHandler(error, isNewParty) {
    return this.store.select('system').pipe(take(1), exhaustMap( systemData => {
      if (!systemData.connected) {
        alert('Device is not connected to the internet. Please connect and try again');
        return isNewParty ? of(new partyAction.addPartiesFailed('Device is not connected to the internet. Please connect and try again')) :
          of(new partyAction.leavePartyFail('Device is not connected to the internet. Please connect and try again'));
      } else {
        return isNewParty ? of(handleError(error)) : of(leavePartyHandleError(error));
      }
    }));
  }

  fetchConnectionHandler() {
    return this.store.select('system').pipe(take(1), exhaustMap( systemData => {
      if (!systemData.connected) {
        return of(new partyAction.fetchPartyFailure('Device is not connected to the internet. Please connect and try again.'));
      } else {
        return of(new partyAction.fetchPartyFailure('Server side error, please try again later.'));
      }
    }));
  }



}
