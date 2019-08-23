import {Component, Input, OnInit} from '@angular/core';
import {UserBillModel} from '../../Shared/userBill.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BillsService} from '../../Shared/bills.service';

@Component({
  selector: 'app-bill-history-item',
  templateUrl: './bill-history-item.component.html',
  styleUrls: ['./bill-history-item.component.css']
})
export class BillHistoryItemComponent implements OnInit {
@Input() Item: number;
selectedItem: UserBillModel;
  constructor(private router: Router, private route: ActivatedRoute, private billServ: BillsService) {}

  ngOnInit() {
    this.selectedItem = this.billServ.getIndexBill(this.Item); // get the item from the index passed in.
  }

}
