import {NgModule} from '@angular/core';
import {MyActiveBillItemComponent} from './my-active-bill-item/my-active-bill-item.component';
import {ActiveBillItemComponent} from './active-bill-item/active-bill-item.component';
import {ActiveBillComponent} from './active-bill.component';
import {SharedModule} from '../Shared/shared.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ActivebillRoutingModule} from './activeBill.routing';


@NgModule({
  declarations: [ActiveBillComponent, MyActiveBillItemComponent, ActiveBillItemComponent],
  imports: [SharedModule, CommonModule, ActivebillRoutingModule, RouterModule],
  exports: [ActiveBillComponent, MyActiveBillItemComponent, ActiveBillItemComponent]
})

export class ActiveBillModule {}
