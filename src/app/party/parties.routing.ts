import {AuthGuard} from '../authentication/auth.guard';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PartyComponent} from './party.component';
import {PartyResolver} from './party.resolver';

const routes = [{path: '', component: PartyComponent, canActivate: [AuthGuard], resolve: [PartyResolver]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PartiesRouting {}
