import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {take, tap} from 'rxjs/operators';
import * as fromApp from '../../AppStore/app.reducer';
import {Store} from '@ngrx/store';
import * as partyAction from '../store/party.action';
import {Subscription} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
@Component({
  selector: 'app-new-party',
  templateUrl: './new-party.component.html',
  styleUrls: ['./new-party.component.css']
})
export class NewPartyComponent implements OnInit, OnDestroy {
  form: FormGroup;
  email = new FormArray([]);
  error = false;
  errorMessage: string = null;
  @Output() isLoading = new EventEmitter<boolean>();
  isLoading2 = false;
  partySub: Subscription;
  sent = false;
  successWatcher: Subscription;

  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  ngOnInit() {
    this.form = new FormGroup({  // reactive form set up.
      'name': new FormControl(null, Validators.required),
      'email' : this.email
    });

    this.partySub = this.store.select('parties').subscribe(partiesData => {

      if (partiesData.AddErrorMessage) {
        this.errorMessage = partiesData.AddErrorMessage;
      }

      if (partiesData.resetForm && this.sent) {
        this.form.reset();
        this.sent = false;
      }

      this.isLoading2 = partiesData.isLoadingNew;
    });


  }

  Onclick() {
    this.sent = true;
    this.error = false; // remove error message
    this.errorMessage = '';
    const usersEmails = (this.form.get('email').value).map(({email}) => email); // get all emails
    this.store.dispatch(new partyAction.addPartiesStart({groupName: this.form.get('name').value, usersEmails}));
  }

  newUser() {
    ( <FormArray> this.form.get('email')).push(new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    }));
  }

  returnControls() {
    return (this.form.get('email') as FormArray).controls;
  }

  onDelete(index) {   // deleted database
    this.errorMessage = null;
    (<FormArray> this.form.get('email')).removeAt(index);
  }

  ngOnDestroy(): void {
    this.partySub.unsubscribe();
  }

}
