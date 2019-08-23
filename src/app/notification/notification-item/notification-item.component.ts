import {Component, Input, OnInit} from '@angular/core';
import {NotificationService} from '../notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {
@Input() BillNotification;

  constructor(private notificationServ: NotificationService, private router: Router) { }
  show = true;
  ngOnInit() {
    console.log(this.BillNotification);
    this.notificationServ.wipeAllVar.pipe(take(1)).subscribe(() => {  // if all is wipe hide the notification
      this.show = false;
    });

    if (this.BillNotification.BillId) {
      this.notificationServ.wipeAllBills.pipe(take(1)).subscribe(data => {  // if billsall is wipe hide the notification
        this.show = data;
      });
    } else {
      this.notificationServ.wipeAllParties.pipe(take(1)).subscribe(data => { // if all parties are wiped then wipe hide the notification
        this.show = data;
      });
    }
  }

  onClick() {
    if (this.BillNotification.BillId) {
      this.notificationServ.wipeNotification(this.BillNotification._id).pipe(take(1)).subscribe(data => { // if clicked remove the notification
        this.router.navigate(['/ActiveBills']);
        this.show = false;
      });
    } else {
      this.notificationServ.wipeNotification(this.BillNotification._id).pipe(take(1)).subscribe(data => {
        this.router.navigate(['/Party']);
        this.show = false;
      });
    }

  }
}
