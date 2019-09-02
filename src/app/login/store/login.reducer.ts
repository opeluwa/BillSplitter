import * as loginActions from './login.actions';
import {LOGIN_SUCCESS} from './login.actions';
import {act} from '@ngrx/effects';
import {LOGIN_START} from './login.actions';


export interface userModel {
  email: string;
  localId: string;
  token: string;
  expirationTime: number;
}

export interface State {
  user: userModel;
  redirect: boolean;
  authError: string;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  redirect: false,
  authError: null,
  isLoading: false
};

export function AuthReducer(state: State = initialState, action: loginActions.loginActions ) {
  switch (action.type) {
    case loginActions.LOGIN_START:
      return {
        ...state,
        isLoading: true
      }
    case loginActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: {email: action.payload.email, localId: action.payload.localId,
          token: action.payload.token, expirationTime: action.payload.expirationTime},
        redirect: action.payload.redirect,
        isLoading: false
      };
    case loginActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case loginActions.LOGIN_FAILURE:
      return {
        ...state,
        authError: action.payload,
        isLoading: false
      };
    default:
      return {
        ...state
      };
  }
}
