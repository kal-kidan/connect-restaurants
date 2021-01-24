import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { CustomerRegistrationComponent } from './customer/customer-registration/customer-registration.component';
import { HomeComponent } from './home/home.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { HomeVendorComponent } from './vendor/home-vendor/home-vendor.component';
import { MenuComponent } from './vendor/menu/menu.component';
import { VendorSignupComponent } from './vendor/vendor-signup/vendor-signup.component';
import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './vendor/schedule/schedule.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './vendor/profile/profile.component';
import { CartComponent } from './customer/cart/cart.component';
import { MyaccountComponent } from './vendor/myaccount/myaccount.component';
import { ChooseLocationComponent } from './customer/choose-location/choose-location.component';
import { OrderHistoryComponent } from './vendor/order-history/order-history.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { SearchComponent } from './customer/search/search.component';
import { FavoriteVendorsComponent } from './customer/favorite-vendors/favorite-vendors.component';
import { PaymentPageComponent } from './admin/payment-page/payment-page.component';
import { AfterLoginForVendorService } from './after-login-for-vendor.service';
import { AfterLoginForAdminService } from './services/after-login-for-admin.service';
import { CustomerOrderHistoryComponent } from './customer/customer-order-history/customer-order-history.component';
const routerOptions: ExtraOptions = {
  useHash: true,
  anchorScrolling: 'enabled',
  // ...any other options you'd like to use
};
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'signup', component: CustomerRegistrationComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'customer-home', component: CustomerHomeComponent, canActivate:[AfterLoginService]},
  {path: 'user-payment', component: PaymentPageComponent, canActivate:[AfterLoginForAdminService]},
  {path: 'admin', component: AdminComponent, canActivate:[AfterLoginForAdminService]},
  {path: 'vendor-home', component: HomeVendorComponent, canActivate:[AfterLoginForVendorService]},
  {path:'search/:q',component:SearchComponent},
  {path:'favorites',component:FavoriteVendorsComponent, canActivate:[AfterLoginService]},
  {path: 'menu', component: MenuComponent, canActivate:[AfterLoginForVendorService]},
  {path: 'vendor-signup', component: VendorSignupComponent },
  {path:'schedule',component:ScheduleComponent, canActivate:[AfterLoginForVendorService]},
  {path:'vendor/:id',component:ProfileComponent},
  {path:'cart',component: CartComponent,  canActivate:[AfterLoginService]},
  {path:'account',component: MyaccountComponent, canActivate:[AfterLoginForVendorService]},
  {path:'vendor-order-history',component: OrderHistoryComponent, canActivate:[AfterLoginForVendorService]},
  {path:'order-history',component: CustomerOrderHistoryComponent, canActivate:[AfterLoginService]},
  {path:'choose-location',component: ChooseLocationComponent, canActivate:[AfterLoginService]},
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
