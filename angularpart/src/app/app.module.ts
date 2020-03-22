import { TokenService } from './services/token.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'; 
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import {RequestHandlerService} from './services/request-handler.service';
import { CustomerHomeComponent } from './customer-home/customer-home.component'

@NgModule({
  declarations: [
    AppComponent,
    CustomerRegistrationComponent,
    HomeComponent,
    CustomerLoginComponent,
    CustomerHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RequestHandlerService,TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
