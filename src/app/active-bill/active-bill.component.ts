import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../Shared/auth.service';
import {UserBillModel} from '../Shared/userBill.model';
import {NotificationService} from '../notification/notification.service';
// import {animate, state, style, transition, trigger} from '@angular/animations';
import * as fromApp from '../AppStore/app.reducer';
import * as billAction from '../bill/store/bill.action';
import * as fromBill from '../bill/store/bill.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-active-bill',
  templateUrl: './active-bill.component.html',
  styleUrls: ['./active-bill.component.css']
  // animations: [trigger('list', [state('in', style({opacity: 1, transform: 'translateX(0)'})),
  //   transition('void => *', [style({opacity: 0, transform: 'translateX(-100px)'}), animate(1000)])])]
})
export class ActiveBillComponent implements OnInit, OnDestroy {
  bills: UserBillModel[] = [];
  myActiveBills = [];
  state = 'normal';
  sub: Subscription;
  constructor(private authServ: AuthService,
              private notificationServ: NotificationService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.sub = this.store.select('bill').subscribe((bills: fromBill.State) => {
      this.myActiveBills = bills.myActiveBills;
      this.bills = bills.bills;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
