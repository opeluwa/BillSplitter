import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {PartyService} from '../party.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-new-party',
  templateUrl: './new-party.component.html',
  styleUrls: ['./new-party.component.css']
})
export class NewPartyComponent implements OnInit {
  form: FormGroup;
  email = new FormArray([]);
  error = false;
  errorMessage = '';
  @Output() isLoading = new EventEmitter<boolean>();
  isLoading2 = false;

  constructor(private partyServ: PartyService) {}

  ngOnInit() {
    this.form = new FormGroup({  // reactive form set up.
      'name': new FormControl(null,Validators.required),
      'email' : this.email
    });
  }

  Onclick() {
    this.error = false; // remove error message
    this.errorMessage = '';
    const usersEmails = (this.form.get('email').value).map(({email}) => email); // get all emails
    this.isLoading.emit(true);
    this.isLoading2 = true;
    this.partyServ.addNewParties(this.form.get('name').value, usersEmails).pipe(take(1)).subscribe(data => {  // attempt to add user in server
      this.isLoading.emit(false);
      this.partyServ.getParties();
      this.isLoading2 = false;
    }, data => {
      this.isLoading2 = false;
      this.errorMessage = data.error.message;
      this.errorMessage = !data.error.message ?  'Error connecting to server please try again later' : this.errorMessage ;
      this.error = true;
    });
  }



  returnControls() {
    return (this.form.get('email') as FormArray).controls;
  }

  onDelete(index) {   // deleted database
    ( <FormArray> this.form.get('email')).removeAt(index);
  }

}
