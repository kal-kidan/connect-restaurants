import { TokenService } from './services/token.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerRegistrationComponent } from './customer/customer-registration/customer-registration.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'; 
import { CustomerLoginComponent } from './customer/customer-login/customer-login.component';
import {RequestHandlerService} from './services/request-handler.service';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component'
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { AdminComponent } from './admin/admin.component';
import { HomeVendorComponent } from './vendor/home-vendor/home-vendor.component';
import { MenuComponent } from './vendor/menu/menu.component';
import { HeaderComponent } from './vendor/header/header.component';
import { VendorSignupComponent } from './vendor/vendor-signup/vendor-signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerRegistrationComponent,
    HomeComponent,
    CustomerLoginComponent,
    CustomerHomeComponent,
    AdminComponent,
    HomeVendorComponent,
    MenuComponent,
    HeaderComponent,
    VendorSignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RequestHandlerService,TokenService, BeforeLoginService, AfterLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
