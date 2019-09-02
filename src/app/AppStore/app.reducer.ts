import * as fromParty from '../party/store/party.reducer';
import * as fromAuth from '../login/store/login.reducer';
import * as fromSystem from '../Shared/systemStore/system.reducer';
import * as fromBill from '../bill/store/bill.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  parties: fromParty.State;
  auth: fromAuth.State;
  system: fromSystem.State;
  bill: fromBill.State
}

export const appReducer: ActionReducerMap<AppState> = {
  parties: fromParty.partyReducer,
  auth: fromAuth.AuthReducer,
  system: fromSystem.systemReducer,
  bill: fromBill.billReducer
};
