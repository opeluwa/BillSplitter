import {AuthGuard} from '../authentication/auth.guard';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {BillHistoryComponent} from './bill-history.component';
import {ActiveBillResolver} from '../active-bill/activeBill.resolver';

const routes = [{path: '', component: BillHistoryComponent, canActivate: [AuthGuard], resolve: [ActiveBillResolver]}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HistoryRouting {}
