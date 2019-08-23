import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../notification/notification.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  isLoadings = false;
  constructor(private notificationSev: NotificationService) { }

  ngOnInit() {
    this.notificationSev.wipeParties(); // wipe all notifications
  }
}
