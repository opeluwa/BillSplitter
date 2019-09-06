import * as systemAction from './system.action';
import {PartyModel} from '../../party/party.model';
import * as partyAction from '../../party/store/party.action';
export interface State {
  connected: boolean;
  headerCollapse: boolean;
}
const initialState: State = {
  connected: true,
  headerCollapse: true // stores state of if the header is collapsed or not
};
export function systemReducer(state = initialState, action: systemAction.systemAction) {
  switch (action.type) {
    case systemAction.CONNECTION_UPDATE:
      return {
        ...state,
        connected: action.payload
      };
    case systemAction.HEADER_COLLAPSE_UPDATE:
      return {
        ...state,
        headerCollapse: action.payload
      };
    default:
      return {
        ...state
      };
  }

}
