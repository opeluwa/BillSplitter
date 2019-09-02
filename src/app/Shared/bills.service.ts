import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {BehaviorSubject} from 'rxjs';
import {UserBillModel} from './userBill.model';
import {map, take, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BillsService {
  constructor(private httpServ: HttpService) {}

}
