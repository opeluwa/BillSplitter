import {Action} from '@ngrx/store';

export const LOGIN_START = '[AUTH] LOGIN_START';
export const LOGIN_SUCCESS = '[AUTH] LOGIN';
export const LOGIN_FAILURE = '[AUTH] LOGIN_FAILURE';
export const LOGOUT = '[AUTH] LOGOUT';
export const AUTOLOGIN = '[AUTH] AUTOLOGIN';
export const SIGNUP = '[AUTH] SIGNUP';
export const LOGOUT_ONREFRESH = '[AUTH] LOGOUT_ONREFRESH';



export class loginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: {email: string, password: string}) {}
}

export class signUp implements Action {
  readonly type = SIGNUP;
  constructor(public payload: {email: string, password: string}) {}
}

export class loginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: {email: string, localId: string, token: string, expirationTime: number, redirect: boolean}) {}
}

export class logout implements Action {
  readonly type = LOGOUT;
}

export class logoutOnRefresh implements Action {
  readonly type = LOGOUT_ONREFRESH;
}

export class autoLogin implements Action {
  readonly type = AUTOLOGIN;
}

export class loginFailure implements Action {
  readonly type = LOGIN_FAILURE;
  constructor(public payload: string) {}
}
export type loginActions = loginStart | loginSuccess | logout | loginFailure | logout | logoutOnRefresh;
