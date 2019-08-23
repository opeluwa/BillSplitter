import { Component, OnInit } from '@angular/core';
import {HttpService} from '../Shared/http.service';
import {AuthService} from '../Shared/auth.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed: boolean  = true;
  isLoggedIn: boolean = false;
  constructor(private httpServ: HttpService, private authServ: AuthService) { }

  ngOnInit() {
    this.authServ.user.subscribe(data => {
      data ? this.isLoggedIn = true : this.isLoggedIn = false;  // check if user is logged in
    });
  }

  logout() {
    this.httpServ.logout();
  }
}
