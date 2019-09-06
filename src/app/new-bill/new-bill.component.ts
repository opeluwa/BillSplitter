import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {HttpService} from '../Shared/http.service';

import {AuthService} from '../Shared/auth.service';
import {mimeType} from './mime-type.validtor';
import {Subscription} from 'rxjs';
import * as fromApp from '../AppStore/app.reducer';
import {Store} from '@ngrx/store';
import * as fromparties from '../party/store/party.reducer';
import * as billAction from '../bill/store/bill.action';
import {PartyModel} from '../party/party.model';
import {Actions, ofType} from '@ngrx/effects';
import {take, tap} from 'rxjs/operators';
@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.css']
})
export class NewBillComponent implements OnInit, OnDestroy {

  constructor(private httpserv: HttpService,
              private authServ: AuthService, private store: Store<fromApp.AppState>,
              private actions$: Actions ) { }

  form: FormGroup;
  userParties: PartyModel[];
  imagePreview: string;
  sub: Subscription;
  isLoading = false;
  subNewBill: Subscription;

  ngOnInit() {
    this.sub = this.store.select('parties').subscribe((data: fromparties.State) => {
      this.userParties = data.parties;
    });

    this.store.select('bill').subscribe(data => {
      this.isLoading = data.isLoading;
    });

    this.subNewBill = this.actions$.pipe(ofType(billAction.NEW_BILL_SUCCESS), tap(() => {  // reset the form, on complete
      this.form.reset();
    })).subscribe();

    this.form = new FormGroup({ // page form
      name: new FormControl(null, [Validators.required]),
      cost: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+(\\.[0-9][0-9]?)?')]),
      party: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
      description: new FormControl(null)
    });
  }

  onSubmit() {  // submit the bill
    const billData = new FormData();
    billData.append('name', this.form.get('name').value);
    billData.append('cost', this.form.get('cost').value);
    billData.append('partyId', this.form.get('party').value.Party._id);
    billData.append('dateDue', new Date(this.form.get('date').value).getTime().toString());
    billData.append('userId', this.authServ.getUserEmail());
    billData.append('image', this.form.get('image').value, this.form.get('name').value);
    billData.append('description', this.form.get('description').value);
    this.store.dispatch(new billAction.newBill(billData));
  }

  onImagePicked(event: Event) {  // image picker
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();  // creating a reader
    reader.onload = () => {   // once it read the file
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);  // load the file
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subNewBill.unsubscribe();
  }
}

