import {Action} from '@ngrx/store';
import {PartyModel} from '../party.model';
import {RecivedPartyModel} from '../recivedParty.model';

export const FETCH_PARTIES = '[PARTY] FETCH_PARTIES';
export const FETCH_PARTIES_FAILURE = '[PARTY] FETCH_PARTIES_FAILURE';
export const SET_PARTIES = '[PARTY] SET_PARTIES';
export const ADD_PARTY = '[PARTY] ADD_PARTY';
export const ADD_PARTY_SUCCESS = '[PARTY] ADD_PARTY_SUCCESS';
export const ADD_PARTY_START = '[PARTY] ADD_PARTY_START';
export const ADD_PARTY_FAILED = '[PARTY] ADD_PARTY_FAILED';
export const LEAVE_PARTY_START = '[PARTY] LEAVE_PARTY_START';
export const LEAVE_PARTY_SUCCESS = '[PARTY] LEAVE_PARTY_SUCCESS';
export const LEAVE_PARTY_FAIL = '[PARTY] LEAVE_PARTY_FAIL';
export const RESET = '[PARTY] RESET';

export class fetchPartyFailure implements Action {
  readonly type = FETCH_PARTIES_FAILURE;
  constructor(public payload: string) {}
}

export class reset implements Action {
  readonly type = RESET;
}

export class leaveParty implements Action {
  readonly type = LEAVE_PARTY_START;
  constructor(public payload: {id: string, partyId: string}) {}
}

export class leavePartyFail implements Action {
  readonly type = LEAVE_PARTY_FAIL;
  constructor(public payload: string) {}
}

export class leavePartySuccess implements Action {
  readonly type = LEAVE_PARTY_SUCCESS;
}

export class fetchParties implements Action {
  readonly type = FETCH_PARTIES;
}

export class setParties implements Action {
  readonly type = SET_PARTIES;
  constructor(public payload: RecivedPartyModel[]) {}
}

export class addParties implements Action {
  readonly type = ADD_PARTY;
}

export class addPartiesSuccess implements Action {
  readonly type = ADD_PARTY_SUCCESS;
  constructor(public payload: RecivedPartyModel) {}
}

export class addPartiesStart implements Action {
  readonly type = ADD_PARTY_START;
  constructor(public payload: {groupName: string, usersEmails: string[]}) {}
}

export class addPartiesFailed implements Action {
  readonly type = ADD_PARTY_FAILED;
  constructor(public payload: string) {}
}
export type PartyAction = fetchParties | setParties | addPartiesSuccess |
  addPartiesStart | addPartiesFailed | leaveParty | leavePartySuccess |
  leavePartyFail | fetchPartyFailure | reset;
