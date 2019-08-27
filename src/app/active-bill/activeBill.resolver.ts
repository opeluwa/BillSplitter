import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BillsService} from '../Shared/bills.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ActiveBillResolver implements  Resolve<any> {
  constructor(private billServ: BillsService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.billServ.getBills();  // every time bill component is opened refresh all the bills


  }
}
