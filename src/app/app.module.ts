import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './components/card/card.component';
import { ErrorInterceptor } from './error.interceptor';

@NgModule({
  declarations: [AppComponent, HomeComponent, CardComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],

  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
