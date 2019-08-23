import {NgModule} from '@angular/core';
import {NotificationItemComponent} from './notification-item/notification-item.component';
import {NotificationComponent} from './notification.component';
import {SharedModule} from '../Shared/shared.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [NotificationComponent, NotificationItemComponent],
  imports: [SharedModule, CommonModule],
  exports: [NotificationComponent, NotificationItemComponent]
})

export class NotificationModule {}
