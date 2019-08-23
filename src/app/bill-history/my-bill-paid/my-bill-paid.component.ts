import {Component, Input, OnInit} from '@angular/core';
import {BillsService} from '../../Shared/bills.service';

@Component({
  selector: 'app-my-bill-paid',
  templateUrl: './my-bill-paid.component.html',
  styleUrls: ['./my-bill-paid.component.css']
})
export class MyBillPaidComponent implements OnInit {
  @Input() selectedItem;
  constructor(private BillServ: BillsService) { }

  ngOnInit() {
  }

}
