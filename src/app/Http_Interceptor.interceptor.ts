import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './Shared/auth.service';

@Injectable()
export class Http_InterceptorInterceptor implements HttpInterceptor{
  constructor(private authServ: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const moddedRequest = req.clone({headers: req.headers.set('authorization', "Bearer " + this.authServ.getToken())});
    return next.handle(moddedRequest);
  }
}
