import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

// service deals with authentication of users

export interface userModel {
  email: string;
  localId: string;
  token: string;
  expirationTime: number;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor() {}
  user = new BehaviorSubject<userModel>(null); // stores user info as an object in.

  setAuth(data) {  // sets the authentication in the localstorage.
    const user = {
      email: data.email,
      localId: data.localId,
      token: data.token,
      expirationTime: data.expirationTime
    };

    localStorage.setItem('user', JSON.stringify(user));  // store user info as auth
    this.user.next(user);  // push the info to the subject.
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
