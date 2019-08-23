import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {NotificationService} from './notification.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements  Resolve<any> {
  constructor(private notificationServ: NotificationService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.notificationServ.getNotifications();

  }
}
