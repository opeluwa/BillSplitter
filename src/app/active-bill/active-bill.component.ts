import { Component, OnInit } from '@angular/core';
import {BillsService} from '../Shared/bills.service';
import {AuthService} from '../Shared/auth.service';
import {UserBillModel} from '../Shared/userBill.model';
import {NotificationService} from '../notification/notification.service';
// import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-active-bill',
  templateUrl: './active-bill.component.html',
  styleUrls: ['./active-bill.component.css']
  // animations: [trigger('list', [state('in', style({opacity: 1, transform: 'translateX(0)'})),
  //   transition('void => *', [style({opacity: 0, transform: 'translateX(-100px)'}), animate(1000)])])]
})
export class ActiveBillComponent implements OnInit {
  bills: UserBillModel[] = [];
  myActiveBills = [];
  state = 'normal';
  constructor(private billServ: BillsService, private authServ: AuthService, private notificationServ: NotificationService) { }

  ngOnInit() {
    this.notificationServ.wipeBills(); // wipe bill notifications as page has been visted.
    this.billServ.billSubject.subscribe(data => {  // get emited bills. no need to destroy
      this.bills = data;   // store the bills recieved
    });

    this.billServ.activeBillSubject.subscribe(data => {    // get users active bills
      this.myActiveBills = data;
    });
  }

}
