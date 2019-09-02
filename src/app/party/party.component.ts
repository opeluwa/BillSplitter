import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../notification/notification.service';
import * as fromApp from '../AppStore/app.reducer';
import * as partyAction from './store/party.action';
import {Store} from '@ngrx/store';
@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit, OnDestroy {
  isLoadings = false;
  constructor(private notificationSev: NotificationService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.notificationSev.wipeParties(); // wipe all notifications
  }

  ngOnDestroy(): void {
    this.store.dispatch(new partyAction.reset());
  }
}
