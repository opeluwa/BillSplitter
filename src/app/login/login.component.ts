import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpService} from '../Shared/http.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../Shared/auth.service';
import {LoadingSpinner} from '../Shared/spinner/loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  islogin: boolean = true;  // decides whether to show login view or sign up view
  @ViewChild('f', {static: false}) f: NgForm;
  isError = false; // show error or not
  errorMessage: string = '';  // error message variable
  isLoading = false;  // decides whether to show loading menu

  constructor(private httpServ: HttpService, private router: Router, private authServ: AuthService) {
  }

  ngOnInit() {
    this.httpServ.logout();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.islogin) {
      this.httpServ.login(this.f.value.email, this.f.value.password).pipe(take(1)).subscribe(data => {  // try to login only take 1
        this.isError = false;
        this.isLoading = false;
        this.router.navigate(['/ActiveBills']);  // navigate to active bills
      }, errorData => { // errors
        console.log(errorData);
        this.isLoading = false;
        this.errorMessage = errorData;
        this.isError = true;
      });
    } else {
      this.httpServ.SignUp(this.f.value.email, this.f.value.password).pipe(take(1)).subscribe(data => { // sign up and move to active bills page
        this.isError = false;
        this.isLoading = false;
        this.islogin = true;
        this.router.navigate(['/ActiveBills']);
      }, errorData => { // errors
        console.log(errorData);
        this.isLoading = false;
        this.errorMessage = errorData.error.message;
        this.isError = true;

      });
    }
  }
}
