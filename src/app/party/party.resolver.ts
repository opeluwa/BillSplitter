import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PartyService} from './party.service';

@Injectable({providedIn: 'root'})
export class PartyResolver implements  Resolve<any> {
  constructor(private partyServ: PartyService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.partyServ.getParties();


  }
}
