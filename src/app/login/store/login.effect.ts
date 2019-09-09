import {HttpClient} from '@angular/common/http';
import * as authActions from './login.actions';
import * as fromApp from '../../AppStore/app.reducer';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, exhaustMap, map, switchMap, take, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../Shared/auth.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import { ConnectionService } from 'ng-connection-service';

import {signUp} from './login.actions';
const BACKEND_URL_USERS = environment.apiUrl + '/user';

const handleSuccess = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
  const user = {
    email: data.email,
    localId: data.localId,
    token: data.token,
    expirationTime: data.expirationTime,
    redirect: true
  };
  return new authActions.loginSuccess(user);
};

const handleError = (error) => {
  if (error.error.message) {
    return new authActions.loginFailure(error.error.message);
  } else {
    return new authActions.loginFailure('Error communicating with server, please try again later');
  }
};

export class AuthEffects {
  constructor(private http: HttpClient, private store: Store<fromApp.AppState>, private actions$: Actions, private authServ: AuthService, private router: Router) {}
  @Effect()
  login = this.actions$.pipe(ofType(authActions.LOGIN_START),
    switchMap((authData: authActions.loginStart) => {
      return this.http.post<any>( BACKEND_URL_USERS + '/login', authData.payload).pipe(
        tap(httpData => {
          this.authServ.setLogoutTimer(httpData.expirationTime);
        }), map(httpData => {
          return handleSuccess(httpData);
        }), catchError( error => { return this.connectionHandler(error); }));
    }));

  @Effect()
  autoLogin = this.actions$.pipe(ofType(authActions.AUTOLOGIN), map(data => {
    const user: {
      email: string;
      localId: string;
      token: string;
      expirationTime: string;
    } = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return {type: 'dummy'};
    }
    if (user.token) {
      this.authServ.setLogoutTimer(+user.expirationTime);
      return new authActions.loginSuccess(
        {email: user.email, localId: user.localId, token: user.token, expirationTime: +user.expirationTime, redirect: false
      });
    }
  }));

  @Effect()
    signUp = this.actions$.pipe(ofType(authActions.SIGNUP), switchMap((actionData: authActions.signUp) => {
      return this.http.post<any>(BACKEND_URL_USERS + '/signup', actionData.payload).pipe(tap(httpData => {
        this.authServ.setLogoutTimer(httpData.expirationTime);
      }), map(httpData => {
        return handleSuccess(httpData);
      }), catchError( error => {

        return this.connectionHandler(error); }));
    }));

  @Effect({dispatch: false})
  logoutOnRefresh = this.actions$.pipe(ofType(authActions.LOGOUT_ONREFRESH), tap(() => {
    this.authServ.removeLogoutTimer();
    localStorage.clear();
  }));

  connectionHandler(error) {
    return this.store.select('system').pipe(take(1), exhaustMap( systemData => {
      if (!systemData.connected) {
        return of(new authActions.loginFailure('Device is not connected to the internet. Please connect and try again'));
      } else {
        return of(handleError(error));
      }
    }));
  }


  @Effect({dispatch: false})
  logout = this.actions$.pipe(ofType(authActions.LOGOUT), tap(data =>{
    this.authServ.removeLogoutTimer();
    localStorage.clear();
    this.router.navigate(['/login']);
    window.location.reload(); // reset everything
  }));

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(ofType(authActions.LOGIN_SUCCESS), tap((successAction: authActions.loginSuccess) => {
    if (successAction.payload.redirect) {
      this.router.navigate(['/']);
    }
  }));

}
