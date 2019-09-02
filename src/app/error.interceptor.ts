import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Injectable, OnInit} from '@angular/core';
import {catchError} from 'rxjs/operators';

export class ErrorInterceptor implements HttpInterceptor {
  isConnected = true;
  toReturn;
  moddedRequest;

  intercept(req: HttpRequest<any>, next: HttpHandler) { // returns specified error if not connected to the internet
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }
}
