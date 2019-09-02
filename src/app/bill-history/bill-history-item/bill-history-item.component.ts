import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserBillModel} from '../../Shared/userBill.model';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromBill from '../../bill/store/bill.reducer';
import * as fromApp from '../../AppStore/app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-bill-history-item',
  templateUrl: './bill-history-item.component.html',
  styleUrls: ['./bill-history-item.component.css']
})
export class BillHistoryItemComponent implements OnInit, OnDestroy {
  @Input() Item: number;
  selectedItem: UserBillModel;
  sub: Subscription;
  constructor(private router: Router, private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.sub = this.store.select('bill').subscribe((bills: fromBill.State) => {
      this.selectedItem = bills.bills[this.Item];
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
