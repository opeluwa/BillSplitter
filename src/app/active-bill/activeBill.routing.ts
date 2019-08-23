import {ActiveBillComponent} from './active-bill.component';
import {AuthGuard} from '../authentication/auth.guard';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ActiveBillResolver} from './activeBill.resolver';

const routes = [{path: '', component: ActiveBillComponent, canActivate: [AuthGuard], resolve: [ActiveBillResolver]}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ActivebillRoutingModule {}
