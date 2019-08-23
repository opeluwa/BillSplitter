import {EventEmitter, Injectable} from '@angular/core';
import {PartyModel} from './party.model';
import {AuthService} from '../Shared/auth.service';
import {HttpService} from '../Shared/http.service';
import {BehaviorSubject} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {RecivedPartyModel} from './recivedParty.model';

@Injectable({providedIn: 'root'})
export class PartyService {
  userParties = new BehaviorSubject<any>(null);
  allUserParties: RecivedPartyModel[] = [];

constructor(private authServ: AuthService, private http: HttpService) {}
  public addNewParties(name: string, emails: string[]) {
    return this.http.addNewParty(name, this.authServ.getUserEmail(), emails).pipe(take(1), tap(data => {
      const newParty = new RecivedPartyModel(data.id, data.partyId, this.authServ.getUserEmail(), false, name, []);
      this.allUserParties.push(newParty);
    }));
  }

  public getParties() {  // parties getter
   this.http.getParties().subscribe(data => {
     this.allUserParties = data;
     this.userParties.next(this.allUserParties);
   });
  }

  leaveParty(id: string, partyId: string) { // leave party request
    return this.http.leaveParty(id, partyId).pipe(take(1), tap(() => {
      const index = this.allUserParties.findIndex(data => data.id === id); // get the index where the user is part of the party
      this.allUserParties.splice(index, 1);
      this.userParties.next(this.allUserParties);
    }));
  }

  accpetPartyRequest(id: string, data: any){ // accept party requests
    this.http.acceptPartyReuest(id, data).subscribe(data =>{
      const index = this.allUserParties.findIndex(dataOfItem => dataOfItem.id === id);
      this.allUserParties[index].accepted = true;
    });
  }
}

