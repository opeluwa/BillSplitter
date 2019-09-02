import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HoverDirective } from './notification/notification-item/hover.directive';
import { AppRouter } from './app-router';
import {TimeAgoPipe} from 'time-ago-pipe';
import { NewBillComponent } from './notification/notification-item/new-bill/new-bill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './Shared/http.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthService } from './Shared/auth.service';
import { BillinfoDirective } from './active-bill/active-bill-item/billinfo.directive';
import { BillComponent } from './bill/bill.component';
import { Http_InterceptorInterceptor } from './Http_Interceptor.interceptor';
import { SharedModule } from './Shared/shared.module';
import { PartyModule } from './party/party.module';
import { NotificationModule } from './notification/notification.module';
import { HistoryModule } from './bill-history/history.module';
import { ActiveBillModule} from './active-bill/activeBill.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './AppStore/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PartyEffect} from './party/store/party.effects';
import {AuthEffects} from './login/store/login.effect';
import {ErrorInterceptor} from './error.interceptor';
import {BillEffect} from './bill/store/bill.effect';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HoverDirective,
    NewBillComponent,
    LoginComponent,
    BillinfoDirective,
    BillComponent,
    ErrorPageComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRouter,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PartyModule,
    NotificationModule,
    HistoryModule,
    ActiveBillModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([PartyEffect, AuthEffects, BillEffect]),
  ],
  providers: [HttpService, AuthService, {provide: HTTP_INTERCEPTORS, useClass: Http_InterceptorInterceptor, multi: true },
                                        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [BillComponent]
})
export class AppModule { }
