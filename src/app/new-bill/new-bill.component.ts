import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncValidator, FormControl, FormGroup, PatternValidator, Validators} from '@angular/forms';

import {HttpService} from '../Shared/http.service';
import {PartyService} from '../party/party.service';
import {RecivedPartyModel} from '../party/recivedParty.model';
import {AuthService} from '../Shared/auth.service';
import {mimeType} from './mime-type.validtor';
import {BillsService} from '../Shared/bills.service';
import {take} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.css']
})
export class NewBillComponent implements OnInit, OnDestroy {

  constructor(private httpserv: HttpService, private partiesServ: PartyService, private authServ: AuthService, private billServ: BillsService) { }

  form: FormGroup;
  userParties: RecivedPartyModel[];
  imagePreview: string;
  sub: Subscription;
  isLoading = false;

  ngOnInit() {
    this.sub = this.partiesServ.userParties.pipe().subscribe( data => {
      this.userParties = data;
    });

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
    this.isLoading = true;
    const billData = new FormData();
    billData.append('name', this.form.get('name').value);
    billData.append('cost', this.form.get('cost').value);
    billData.append('partyId', this.form.get('party').value.partyId._id);
    billData.append('dateDue', new Date(this.form.get('date').value).getTime().toString());
    billData.append('userId', this.authServ.getUserEmail());
    billData.append('image', this.form.get('image').value, this.form.get('name').value);
    billData.append('description', this.form.get('description').value);
    this.billServ.newBill(billData).pipe(take(1)).subscribe(() => {
      this.isLoading = false;
      this.form.reset();
    }, () => {
      alert('Error with your request. Please try again later');
      this.isLoading = false;
    });
  }

  onImagePicked(event: Event) {  // image picker
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();  // creating a reader
    reader.onload = () => {   // once it read the file
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);  // load the file
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

