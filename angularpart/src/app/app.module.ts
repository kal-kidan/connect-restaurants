import { TokenService } from './services/token.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerRegistrationComponent } from './customer/customer-registration/customer-registration.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'; 
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
import { ScheduleComponent } from './vendor/schedule/schedule.component';
import { LogoutComponent } from './logout/logout.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfileComponent } from './vendor/profile/profile.component';
import { CartComponent } from './customer/cart/cart.component';
import { CustomerHeaderComponent } from './customer/customer-header/customer-header.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerRegistrationComponent,
    HomeComponent, 
    CustomerHomeComponent,
    AdminComponent,
    HomeVendorComponent,
    MenuComponent,
    HeaderComponent,
    VendorSignupComponent,
    LoginComponent,
    ScheduleComponent,
    LogoutComponent,
    PagenotfoundComponent,
    ProfileComponent,
    CartComponent,
    CustomerHeaderComponent
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
