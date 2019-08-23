import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {BehaviorSubject} from 'rxjs';
import {UserBillModel} from './userBill.model';
import {PartyService} from '../party/party.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BillsService {
  constructor(private httpServ: HttpService, private partyServ: PartyService) {}

  private Bills: UserBillModel[] = [];  // stores all bills
  private myActiveBills = [];  // stores all UserActive Bills
  private paidBills = []; // stores all bills that have been paid

  billSubject = new BehaviorSubject<any>(null);  // all bill subject
  activeBillSubject = new BehaviorSubject<any>(null); // subject for all active bills
  paidBillSubject = new BehaviorSubject<any>(null); // subject for paid bills
  
getBills() {
  this.httpServ.getBills().subscribe(data => {
    this.Bills = [];
    this.Bills = data;
    this.billSubject.next(data);
  });

  this.httpServ.getMyActiveBills().subscribe(data =>{
    this.myActiveBills = [];
    this.paidBills = [];
    data.map(arrays => {
      let usersWhoNeedToPay = [];  // list of users who still need to pay
      arrays.billUsers.map(users => {
        if (!users.paid) {  // if user hasnt paid add to array
          usersWhoNeedToPay.push(users.email);
        }

      });
      if (usersWhoNeedToPay.length > 0) { // if more than 0 people still need to pay its active.
        this.myActiveBills.push({bill: arrays, stillDue: usersWhoNeedToPay});
      } else {
        this.paidBills.push({bill: arrays});
      }
    });
    this.activeBillSubject.next(this.myActiveBills); // push new active bills
    this.paidBillSubject.next(this.paidBills); // push paid bills subject
  });
}

  public getIndexBill(index: number): UserBillModel {
    const item = this.Bills.slice(index, index + 1);
    return item[0];
  }

  public payBill(index: number) { // when a bill is to be paid
  const payThisBill = {
    _id: this.Bills[index].userBillId,
    partyId: this.Bills[index].mainBill.partyId,
    accepted: true, // mark bill as paid
    groupName: this.Bills[index].mainBill.billName,
    billId: this.Bills[index].mainBill.Id
  };
  return this.httpServ.payBill(payThisBill).pipe(take(1), tap(() => { // pay the bill through a server request
      this.getBills();
      this.Bills.splice(index, 1);
    }));
  }

  public newBill(data) {  // create a new bill
    return this.httpServ.NewBill(data).pipe(tap(() => {
      this.getBills();
    }));
  }
}
