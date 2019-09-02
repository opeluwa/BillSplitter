import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserBillModel} from '../Shared/userBill.model';
import * as fromApp from '../AppStore/app.reducer';
import {Store} from '@ngrx/store';
import * as fromBill from '../bill/store/bill.reducer';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-bill-history',
  templateUrl: './bill-history.component.html',
  styleUrls: ['./bill-history.component.css']
})
export class BillHistoryComponent implements OnInit, OnDestroy {
  bills: UserBillModel[] = [];
  myBills = [];
  sub: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.sub = this.store.select('bill').subscribe((bills: fromBill.State) => {
      console.log(bills.bills);
      this.bills = bills.bills;
      this.myBills = bills.paidBills;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
