import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../Shared/auth.service';
import {take, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as fromApp from '../AppStore/app.reducer';
import * as fromLogin from '../login/store/login.reducer';

import {Store} from '@ngrx/store';
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authServ: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Authentication guard to ensure that the user is logged in
    return this.store.select('auth').pipe( map((loginState: fromLogin.State) => {
      return loginState.user ?  true :  this.router.createUrlTree(['/login']);
    } ));
}


    // return this.authServ.user.pipe(take(1), map( data => { // no need to destroy as on one is taken
    //   const isAuth = !!data;
    //   return isAuth ?  true :  this.router.createUrlTree(['/login']);
    //   // in the case where the auth hasn't been set in memory, redirect to the login
    // }));
    // }
  }

