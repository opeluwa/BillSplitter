import {Component, OnInit, Renderer2} from '@angular/core';
import {HttpService} from './Shared/http.service';
import {AuthService} from './Shared/auth.service';
import {PartyService} from './party/party.service';
import {BillsService} from './Shared/bills.service';
import {NotificationService} from './notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BillSplitter';
  isLoggedIn = false;
constructor(private http: HttpService, private authServ: AuthService, private partyServ: PartyService,
            private billServ: BillsService, private notificationServ: NotificationService) {}
  ngOnInit(): void {
    this.http.autoLogin();

    this.authServ.user.subscribe(data => {
      data ? this.isLoggedIn = true : this.isLoggedIn = false;
      if (this.authServ.getToken()) {
        this.notificationServ.getNotifications();
      }
    });

  }

}
