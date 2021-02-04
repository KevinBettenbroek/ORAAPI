import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BasicAuthInterceptor } from './auth/basic-auth.interceptor';
import { ErrorInterceptor } from './auth/error.interceptor';
import { OverviewsModule } from './overviews/overviews.module';
import { ControlesModule } from './controles/controles.module';
import { UserModule } from './user/user.module';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterTestingModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    MatButtonModule,
    OverviewsModule,
    ControlesModule,
    UserModule,
  ],
  exports: [AppRoutingModule],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
