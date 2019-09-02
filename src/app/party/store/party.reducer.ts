import * as partyAction from './party.action';
import {RecivedPartyModel} from '../recivedParty.model';

export interface State {
  parties: RecivedPartyModel[];
  partyToAddName: string;
  partyToAddEmail: string[];
  AddErrorMessage: string;
  idToLeave: {id: string, partyId: string};
  leavePartyError: string;
  isLoadingManage: boolean;
  isLoadingNew: boolean;
}

const initialState: State = {
  parties: [],
  partyToAddName: '',
  partyToAddEmail: [],
  AddErrorMessage: null,
  idToLeave: null,
  leavePartyError: null,
  isLoadingManage: false,
  isLoadingNew: false
};

export function partyReducer(state = initialState, action: partyAction.PartyAction) {
  switch (action.type) {
    case partyAction.SET_PARTIES:
      return {
        ...state,
        parties: action.payload,
        isLoading: false
      };
    case partyAction.RESET:
      return {
        ...state,
        leavePartyError: null,
        AddErrorMessage: null
      };
    case partyAction.ADD_PARTY_SUCCESS:
      return {
        ...state,
        parties : [...state.parties, action.payload],
        isLoadingNew: false,
        partyToAddName: '',
        partyToAddEmail: [],
      };
    case partyAction.ADD_PARTY_START:
      return {
        ...state,
        partyToAddName: action.payload.groupName,
        partyToAddEmail: action.payload.usersEmails,
        AddErrorMessage: null,
        isLoadingNew: true
      };
    case partyAction.ADD_PARTY_FAILED:
        return {
        ...state,
          AddErrorMessage: action.payload,
          isLoadingNew: false,
          partyToAddName: '',
          partyToAddEmail: []
        };
    case partyAction.LEAVE_PARTY_START:
      return {
        ...state,
        idToLeave: {id: action.payload.id, partyId: action.payload.partyId},
        leavePartyError: null,
        isLoadingManage: true
      };

    case partyAction.LEAVE_PARTY_SUCCESS:
      const OgArray = [...state.parties];
      const filteredArray = OgArray.filter(item => {
        return item.id !== state.idToLeave.id;
      });
      return {
        ...state,
        parties: [...filteredArray],
        isLoadingManage: false,
        idToLeave: null
      };
    case partyAction.LEAVE_PARTY_FAIL:
      return {
        ...state,
        leavePartyError: action.payload,
        isLoadingManage: false,
        idToLeave: null
      };
    default:
      return {
        ...state
      };
  }
}
