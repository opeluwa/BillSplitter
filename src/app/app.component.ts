import {Component, OnInit, Renderer2} from '@angular/core';
import {HttpService} from './Shared/http.service';
import {AuthService} from './Shared/auth.service';
import {NotificationService} from './notification/notification.service';
import {Store} from '@ngrx/store';
import * as fromApp from './AppStore/app.reducer';
import * as authAction from './login/store/login.actions';
import * as systemAction from './Shared/systemStore/system.action';
import {take, tap} from 'rxjs/operators';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BillSplitter';
  connection: boolean;
  status: string;
constructor(private http: HttpService, private authServ: AuthService,
            private notificationServ: NotificationService,
            private store: Store<fromApp.AppState>, private connectionService: ConnectionService) {}
  ngOnInit(): void {

    this.connectionService.monitor().subscribe(isConnected => {
      console.log('connection has changed');
      this.connection = isConnected;
      if (this.connection) {
        this.store.dispatch(new systemAction.connectionUpdate(true));
      } else {
        this.store.dispatch(new systemAction.connectionUpdate(false));
      }
    });

    this.store.dispatch(new authAction.autoLogin());

    // this.store.select('auth').pipe(tap(data => {
    //   this.store.dispatch(new authAction.autoLogin());
    //   data.user ? this.isLoggedIn = true : this.isLoggedIn = false;
    // }));

  }

}
