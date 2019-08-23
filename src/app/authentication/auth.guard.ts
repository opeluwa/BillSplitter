import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../Shared/auth.service';
import {take, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authServ: AuthService, private router: Router) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Authentication guard to ensure that the user is logged in
    return this.authServ.user.pipe(take(1), map( data => { // no need to destroy as on one is taken
      const isAuth = !!data;
      return isAuth ?  true :  this.router.createUrlTree(['/login']);
      // in the case where the auth hasn't been set in memory, redirect to the login
    }));
    }
  }

