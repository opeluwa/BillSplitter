import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {map, take, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../Shared/auth.service';
import {LoadingSpinner} from '../Shared/spinner/loading-spinner';
import * as fromApp from '../AppStore/app.reducer';
import * as authActions from './store/login.actions';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  islogin: boolean = true;  // decides whether to show login view or sign up view
  @ViewChild('f', {static: false}) f: NgForm;
  errorMessage: string = null;  // error message variable
  isLoading = false;  // decides whether to show loading menu
  sub: Subscription;
  constructor(private router: Router,
              private authServ: AuthService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new authActions.logoutOnRefresh());
    this.sub = this.store.select('auth').pipe(map(data => { return data; })).subscribe(data => {
      this.errorMessage = data.authError;
      this.isLoading = data.isLoading;
    });

  }

  onSubmit() {
    if (this.islogin) {
      this.store.dispatch(new authActions.loginStart(
        {email: this.f.value.email, password: this.f.value.password}));
    } else {
      this.store.dispatch(new authActions.signUp(
        {email: this.f.value.email, password: this.f.value.password}));
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
