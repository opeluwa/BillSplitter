import { Component, OnInit } from '@angular/core';
import {UserBillModel} from '../Shared/userBill.model';
import {BillsService} from '../Shared/bills.service';

@Component({
  selector: 'app-bill-history',
  templateUrl: './bill-history.component.html',
  styleUrls: ['./bill-history.component.css']
})
export class BillHistoryComponent implements OnInit {
  bills: UserBillModel[] = [];
  myBills = [];

  constructor(private billServ: BillsService) { }

  ngOnInit() {
    this.billServ.billSubject.subscribe(data => { // sets the bills assaigned by other users.
      this.bills = data;
    });

    this.billServ.paidBillSubject.subscribe(data => {  // sets bills asaigned by the current user.
      this.myBills = data;
    });

  }

}
