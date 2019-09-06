import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as fromApp from '../AppStore/app.reducer';
import * as authAction from '../login/store/login.actions';
import {Store} from '@ngrx/store';
// service deals with authentication of users

export interface userModel {
  email: string;
  localId: string;
  token: string;
  expirationTime: number;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private tokenTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}
  user = new BehaviorSubject<userModel>(null); // stores user info as an object in.

  setAuth(data) {  // sets the authentication in the localstorage.
    const user = {
      email: data.email,
      localId: data.localId,
      token: data.token,
      expirationTime: data.expirationTime
    };

    localStorage.setItem('user', JSON.stringify(user));  // AppStore user info as auth
    this.user.next(user);  // push the info to the subject.
  }

  setLogoutTimer(exp: number) {
    const timeLeft = exp - new Date().getTime();
    this.tokenTimer = setTimeout(() => {
      this.store.dispatch(new authAction.logout());
    }, timeLeft);
  }

  removeLogoutTimer() {
    clearInterval(this.tokenTimer);
  }

  getUserEmail() { // gets the email stored in the localstorage
    return JSON.parse(localStorage.getItem('user')).email;
  }

  public getToken() { // gets the token stored in the localstorage
    const localstorage = JSON.parse(localStorage.getItem('user'));
    return localstorage ? localstorage.token : null;
  }

  public getlocalId() { // gets the userId stored in the localstorage
    const localstorage = JSON.parse(localStorage.getItem('user'));
    return localstorage ? localstorage.localId : null;
  }
}
