import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {PartyModel} from '../party.model';
import {NgForm} from '@angular/forms';
import {RecivedPartyModel} from '../recivedParty.model';
import {map, take} from 'rxjs/operators';
import * as fromApp from '../../AppStore/app.reducer';
import * as partiesAction from '../store/party.action';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-manage-party',
  templateUrl: './manage-party.component.html',
  styleUrls: ['./manage-party.component.css']
})
export class ManagePartyComponent implements OnInit, OnDestroy {

  usersParties: PartyModel[] = [];
  partySelected: RecivedPartyModel;
  @Output() isLoading = new EventEmitter<boolean>();
  @ViewChild('f', { static: false }) form: NgForm;
  isLoading2 = false;
  error;
  initSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.partySelected = null;
    this.initSub = this.store.select('parties').subscribe(data => {
      this.usersParties = data.parties;
      if  (data.leavePartyError) {
        this.error = data.leavePartyError;
      }
      this.isLoading2 = data.isLoadingManage;
    });
  }

  OnSubmit() {
    this.store.dispatch( new partiesAction.leaveParty({id: this.form.value.party.id,
      partyId: this.form.value.party.Party._id}));
    this.partySelected = null;
  }

  ngOnDestroy(): void {
    this.initSub.unsubscribe();
  }
}
