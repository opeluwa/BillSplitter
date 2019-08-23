import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, take, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import { Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {BillModel} from './bill.model';
import {UserBillModel} from './userBill.model';

import {environment} from '../../environments/environment';

const BACKEND_URL_BILL = environment.apiUrl + '/bills';
const BACKEND_URL_NOTIFICATIONS = environment.apiUrl + '/notifications';
const BACKEND_URL_USERS = environment.apiUrl + '/user';
const BACKEND_URL_PARTIES = environment.apiUrl + '/parties';
export interface dataLogin {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private authServ: AuthService, private router: Router) {}
  private tokenTimer: any;

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
  getBills(): Observable<any> { // get all bills requests
    return this.http.get<any>(BACKEND_URL_BILL).pipe(take(1), map(data => {
      let Bill: UserBillModel[] = [];
      data.content.map( bills => {
        const mainBill = new BillModel(bills.billId._id, bills.billId.billName, bills.billId.cost, bills.billId.dateCreated,
          bills.billId.dateDue, bills.billId.partyId, bills.billId.userId, bills.billId.description, +bills.billId.numOfPayers, bills.billId.imagePath);
        Bill.push(new UserBillModel(mainBill, bills._id, bills.paid));
      });
      return Bill;
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

  SignUp(email: string, password: string){   // sign user up requests
    const credentials = {
      email: email,
      password: password
    };
    return this.http.post<any>(BACKEND_URL_USERS + '/signup', credentials).pipe(take(1), tap(data => {
      this.autoLogout(data.expirationTime);
      this.handleAuth(data);
    }));

  }

  login(email: string, password: string) {   // login user requests
    const credentials = {
      email: email,
      password: password
    };

    return this.http.post<any>( BACKEND_URL_USERS + '/login', credentials).pipe(take(1),
     catchError(this.handleErrorAuth), tap(data => {
      this.autoLogout(data.expirationTime);
      this.handleAuth(data);
     }));
  }

  autoLogout(exp: number) {  // logs user out based on expiration date
    const timeleft = exp - new Date().getTime();
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, timeleft);
  }

  autoLogin() {  // attempt to login user when pag is opened
    const userData = JSON.parse(localStorage.getItem('user')); // load user localstorage.
    if (userData) {
      const isExpired =  userData.expirationTime - new Date().getTime();  // check expiration token date
      if (!isExpired) {
       return this.logout();
      }
      this.authServ.user.next(userData);
      this.autoLogout(userData.expirationTime);
     } else {
      this.logout();
    }

  }

  logout() { // logout users
    clearTimeout(this.tokenTimer);
    if (localStorage.getItem('user')) {
      window.location.reload();
    }
    localStorage.clear();  // clear localstorage

    this.authServ.user.next(null);
    this.router.navigate(['/login']); // navigate to login pag

  }

  getParties(): Observable<any> { // get parties requests
   return this.http.get<{message: string, posts: any}>(BACKEND_URL_PARTIES).pipe(take(1), map(data => {
      return data.posts.map( post => {
        return{
          groupName: post.groupName,
          user: post.user,
          userEmail: post.partyId.userEmail,
          id: post._id,
          partyId: post.partyId,
          accepted: post.accepted
        };
      });
    }));
  }

  getMyActiveBills(){ // get users own active bills
    return this.http.get<{message: string, content: any[]}>(BACKEND_URL_BILL + '/myBills').pipe(take(1), map(data => {
      return data.content;
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
  addNewParty(groupName: string, user: string, userEmail: string[]): Observable<({message: string, id: string, partyId: string})> { // create a new party

    const obj = { // object to be sent
      groupName: groupName,
      user: user,
      userEmail: userEmail
    };

    return this.http.post<{message: string, id: string, partyId: string}>(BACKEND_URL_PARTIES, obj).pipe(take(1), map((data) => {
      return data;
    }));

  }

  leaveParty(id: string, partyId: string): Observable<{ message: string}> { // leave a party
    const body = {'partyId': partyId };
    return this.http.post<{ message: string}>(BACKEND_URL_PARTIES + '/leave/' + id, body).pipe(map(data => {

      return data;
    }));
  }

  acceptPartyReuest(id: string, data: any) {  // accept party request
    return this.http.put(BACKEND_URL_PARTIES + '/parties/' + id, data);
  }

handleErrorAuth(error: HttpErrorResponse) { // handle errors from auth
  let errorMessage = 'Unknown error';
  switch(error.error.message){
    case 'EMAIL_EXISTS':
      errorMessage = 'Email already exists';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'Email is not registered';
      break;
    default:
      errorMessage = 'Wrong password';
      break;
  }
  return throwError(errorMessage);
}

  handleAuth(data) {
    this.authServ.setAuth(data);
  }
}
