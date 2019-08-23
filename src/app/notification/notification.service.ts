import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpService} from '../Shared/http.service';

@Injectable({providedIn: 'root'})
export class  NotificationService{
  Notifications = new BehaviorSubject(null);
  billNotifications = [];
  partyNotifications = [];
  billNotificationSubject = new BehaviorSubject(null);
  partyNotificationSubject = new BehaviorSubject(null);
  wipeAllVar = new EventEmitter();
  wipeAllBills = new BehaviorSubject(true);
  wipeAllParties = new BehaviorSubject(true);
  constructor(private http: HttpService) {}
  getNotifications() {
    this.http.getAllNotifications().subscribe(data => {
      (data.notificationsBills).map(item => {
        this.billNotifications.push(item);
      });
      console.log(this.billNotifications);
      this.billNotificationSubject.next(this.billNotifications);

      (data.notificationsParty).map(item => {
        this.partyNotifications.push(item);
      });
      this.partyNotificationSubject.next(this.partyNotifications);
  });
  }

  wipeNotification(index: number) {
    return this.http.wipeNotiification(index);
  }

  wipeAll() {
    this.http.wipeAll().subscribe(data => {
      this.wipeAllVar.emit();
      this.billNotificationSubject.next(null);
      this.partyNotificationSubject.next(null);
    });
  }

  wipeBills() {
    this.http.wipeAllBills().subscribe(() => {
      this.wipeAllBills.next(false);
    });
  }

  wipeParties() {
    this.http.wipeAllParties().subscribe(() => {
      this.wipeAllParties.next(false);
    });
  }
}
