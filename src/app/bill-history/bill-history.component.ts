import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
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
  selected = 1;
  @ViewChild('dropdown', {static: false}) dropDown: ElementRef;

  constructor(private store: Store<fromApp.AppState>, private render: Renderer2) { }

  ngOnInit() {
    this.sub = this.store.select('bill').subscribe((bills: fromBill.State) => {
      this.bills = bills.bills;
      this.myBills = bills.paidBills;
    });
  }

  onDropdown() {
    const el = this.dropDown.nativeElement.classList.contains('show');
    if (el === false){
      this.render.addClass(this.dropDown.nativeElement,   'show');
    } else {
      this.render.removeClass(this.dropDown.nativeElement, 'show');
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
