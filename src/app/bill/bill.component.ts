import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserBillModel} from '../Shared/userBill.model';
import {BillsService} from '../Shared/bills.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
@Input() selectedItem: UserBillModel;  // bill that has been selected.
@Output() closeDiv = new EventEmitter();  // emits when compoenent should be closed.
@Output() payBill = new EventEmitter(); // emits when bill is to be paid
  @Input() Index: number;
  date;
  isLoading = false;
  constructor(private billServ: BillsService) { }

  ngOnInit() {
    this.date = new Date().getTime();
  }

  onClick() {  // when bill is to be paid
    this.closeDiv.emit();
  }

  pay() {

    this.isLoading = true;

    this.billServ.payBill(this.Index).subscribe(() => {
      this.isLoading = false;
      this.selectedItem = null;
      this.payBill.emit();
    }, () => {
      alert('Error, failed to mark bill as payed. Please try again later');
      this.payBill.emit();
    });
  }

}
