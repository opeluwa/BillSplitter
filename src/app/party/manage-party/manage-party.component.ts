import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PartyService} from '../party.service';
import {PartyModel} from '../party.model';
import {NgForm} from '@angular/forms';
import {RecivedPartyModel} from '../recivedParty.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-manage-party',
  templateUrl: './manage-party.component.html',
  styleUrls: ['./manage-party.component.css']
})
export class ManagePartyComponent implements OnInit {

  usersParties: PartyModel[] = [];
  partySelected: RecivedPartyModel;
  @Output() isLoading = new EventEmitter<boolean>();
  @ViewChild('f', { static: false }) form: NgForm;
  isLoading2 = false;
  constructor(private partyServ: PartyService) { }

  ngOnInit() {
    this.partySelected = null;
    this.partyServ.userParties.subscribe( data => {
      this.usersParties = (data);
    });
  }

  OnSubmit() {
    this.isLoading2 = true;
    this.isLoading.emit(true);
    this.partyServ.leaveParty(this.form.value.party.id, this.partySelected.Party).pipe(take(1)).subscribe(data => {
      this.isLoading2 = false;
      this.isLoading.emit(false);
    }, () => {
      this.isLoading2 = false;
      alert('Error connecting to the server. Please try again later');
    });
    this.partySelected = null;
  }
}
