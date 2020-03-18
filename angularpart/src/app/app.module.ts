import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'; 
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import {RequestHandlerService} from './services/request-handler.service'

@NgModule({
  declarations: [
    AppComponent,
    CustomerRegistrationComponent,
    HomeComponent,
    CustomerLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RequestHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
