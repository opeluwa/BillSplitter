import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserBillModel} from '../Shared/userBill.model';
import * as fromApp from '../AppStore/app.reducer';
import * as billAction from '../bill/store/bill.action';
import {Store} from '@ngrx/store';
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
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.date = new Date().getTime();
  }

  onClick() {  // when bill is to be paid
    this.closeDiv.emit();
  }

  pay() {
    this.store.dispatch(new billAction.payBill({index: this.Index}));
    this.payBill.emit();

  }

}
