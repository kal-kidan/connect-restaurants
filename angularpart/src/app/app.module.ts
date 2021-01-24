import { TokenService } from './services/token.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal'; 
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
import { MyaccountComponent } from './vendor/myaccount/myaccount.component';
import { ChooseLocationComponent } from './customer/choose-location/choose-location.component';
import { OrderHistoryComponent } from './vendor/order-history/order-history.component';
import { ViewLocationComponent } from './view-location/view-location.component';
import { MomentModule } from 'ngx-moment';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { SearchComponent } from './customer/search/search.component';
import { FavoriteVendorsComponent } from './customer/favorite-vendors/favorite-vendors.component';
import { PaymentPageComponent } from './admin/payment-page/payment-page.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { CustomerOrderHistoryComponent } from './customer/customer-order-history/customer-order-history.component';
import { AccountSettingComponent } from './customer/account-setting/account-setting.component';
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
    CustomerHeaderComponent,
    MyaccountComponent,
    ChooseLocationComponent,
    OrderHistoryComponent,
    ViewLocationComponent,
    AdminLoginComponent,
    SearchComponent,
    FavoriteVendorsComponent,
    PaymentPageComponent,
    AdminHeaderComponent,
    CustomerOrderHistoryComponent,
    AccountSettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot() 
  ],
  providers: [RequestHandlerService,TokenService, BeforeLoginService, AfterLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
