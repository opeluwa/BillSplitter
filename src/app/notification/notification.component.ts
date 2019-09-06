import { Component, OnInit } from '@angular/core';
import {NotificationService} from './notification.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  billNotifications = [];
  partyNotifications = [];
  wipe = false;
  constructor(private NotificationServ: NotificationService) { }
  //


  ngOnInit() {
    this.NotificationServ.billNotificationSubject.subscribe(data => {
       data ? this.billNotifications = data : []; // if all bills are wiped, show this.
    });

    this.NotificationServ.wipeAllVar.pipe(take(1)).subscribe(() => {  // if all notifications are wiped wipe and show this
      this.wipe = true;
    });

    this.NotificationServ.partyNotificationSubject.subscribe(data => { // wipe all party notifications if required
      data ? this.partyNotifications = data : [];
    });
  }

  onClick() { // if wipeAll is clicked, remove all notifications
    this.NotificationServ.wipeAll();
  }

}
