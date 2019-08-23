import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewBillComponent} from './new-bill/new-bill.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './authentication/auth.guard';
import {PartyResolver} from './party/party.resolver';
import {ErrorPageComponent} from './error-page/error-page.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'ActiveBills', loadChildren: './active-bill/activeBill.module#ActiveBillModule'},
  {path: 'NewBill',  canActivate: [AuthGuard], component: NewBillComponent, resolve: [PartyResolver]},
  {path: 'Party', loadChildren: './party/party.module#PartyModule'},
  {path: 'login',  component: LoginComponent},
  {path: 'history',  loadChildren: './bill-history/history.module#HistoryModule'},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'This page does not exist!'}},
  {path: '**', redirectTo: 'ActiveBills' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRouter {

}
