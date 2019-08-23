import {NgModule} from '@angular/core';
import {PartyComponent} from './party.component';
import {ManagePartyComponent} from './manage-party/manage-party.component';
import {SharedModule} from '../Shared/shared.module';
import {NewPartyComponent} from './new-party/new-party.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PartiesRouting} from './parties.routing';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [PartyComponent, ManagePartyComponent, NewPartyComponent],
  imports: [SharedModule, ReactiveFormsModule, CommonModule, FormsModule, PartiesRouting, RouterModule],
  exports: [PartyComponent, ManagePartyComponent, NewPartyComponent]
})
export class PartyModule {}
