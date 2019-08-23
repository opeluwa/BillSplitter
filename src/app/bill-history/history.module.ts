import {NgModule} from '@angular/core';
import {BillHistoryItemComponent} from './bill-history-item/bill-history-item.component';
import {MyBillPaidComponent} from './my-bill-paid/my-bill-paid.component';
import {BillHistoryComponent} from './bill-history.component';
import {SharedModule} from '../Shared/shared.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HistoryRouting} from './history.routing';

@NgModule({
  declarations: [BillHistoryComponent, MyBillPaidComponent, BillHistoryItemComponent],
  imports: [SharedModule, CommonModule, HistoryRouting, RouterModule],
  exports: [BillHistoryComponent, MyBillPaidComponent, BillHistoryItemComponent]
})
export class HistoryModule {}
