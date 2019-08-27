import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PartyService} from './party.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PartyResolver implements  Resolve<any> {
  constructor(private partyServ: PartyService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.partyServ.getParties();


  }
}
