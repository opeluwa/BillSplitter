import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { map, take, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import { Observable} from 'rxjs';
import {Router} from '@angular/router';

import {environment} from '../../environments/environment';

const BACKEND_URL_BILL = environment.apiUrl + '/bills';
const BACKEND_URL_NOTIFICATIONS = environment.apiUrl + '/notifications';


@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  NewBill(req: any): Observable<any> { // create a new bill request
    return this.http.post<any>(BACKEND_URL_BILL, req).pipe(take(1), map(data => {
    }));
  }

  getAllNotifications() { // get all notifications request
    return this.http.get<{message: string, notificationsBills: any, notificationsParty: any}>(
      BACKEND_URL_NOTIFICATIONS).pipe(take(1), map(data => {
      return data;
    }));
  }

  wipeNotiification(index: number) {  // wipe specific notifications request
    return this.http.delete(BACKEND_URL_NOTIFICATIONS + index).pipe(take(1));
  }

  payBill(billId) {   // pay bills request
    return this.http.put(BACKEND_URL_BILL + '/paybill', billId).pipe(take(1));
  }

  wipeAll() { // wipe all notifications request
    return this.http.post(BACKEND_URL_NOTIFICATIONS, null).pipe(take(1), map(data => {
      return data;
    }));
  }

  wipeAllBills() { // wipe all of bill notifications
    return this.http.delete(BACKEND_URL_NOTIFICATIONS + '/bills').pipe(take(1), map(data => {
      return data;
    }));
  }

  wipeAllParties() { // wipe all of parties notifications
    return this.http.delete(BACKEND_URL_NOTIFICATIONS + '/party').pipe(take(1), map(data => {
      return data;
    }));
  }
}
