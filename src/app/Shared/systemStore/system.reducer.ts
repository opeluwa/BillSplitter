import * as systemAction from './system.action';
import {PartyModel} from '../../party/party.model';
import * as partyAction from '../../party/store/party.action';
export interface State {
  connected: boolean;
}
const initialState: State = {
  connected: true
};
export function systemReducer(state = initialState, action: systemAction.systemAction) {
  switch (action.type) {
    case systemAction.CONNECTION_UPDATE:
      return {
        ...state,
        connected: action.payload
      };
    default:
      return {
        ...state
      };
  }

}
