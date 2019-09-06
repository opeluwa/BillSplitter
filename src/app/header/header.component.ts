import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HttpService} from '../Shared/http.service';
import {AuthService} from '../Shared/auth.service';
import * as authActions from '../login/store/login.actions';
import * as fromAuth from '../login/store/login.reducer';
import * as fromApp from '../AppStore/app.reducer';
import * as systemAction from '../Shared/systemStore/system.action';
import {map, take, tap} from 'rxjs/operators';
import {State, Store} from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed: boolean  = true;
  isLoggedIn: boolean = false;
  @ViewChild('hiddenMenu', {static: false}) hiddenDiv: ElementRef;
  constructor(private httpServ: HttpService, private authServ: AuthService,
              private store: Store<fromApp.AppState>, private render: Renderer2) { }

  ngOnInit() {
    this.store.select('auth').pipe(map((stateData: fromAuth.State) => {
      return stateData.user;
    })).subscribe(authData => {
      this.isLoggedIn = !!authData; // check if user is logged in
    });
  }

  simulateDivClick() {
    const isCollapsed = this.hiddenDiv.nativeElement.classList.contains('collapse');
    this.store.dispatch(new systemAction.headerCollapseUpdate(!isCollapsed));  // collapse or uncollapse nav bar
  }

  logout() {
    this.store.dispatch(new authActions.logout());
  }
}
