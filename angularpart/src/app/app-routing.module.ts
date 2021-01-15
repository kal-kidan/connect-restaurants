import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'signup', component: CustomerRegistrationComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'customer-home', component: CustomerHomeComponent, canActivate:[AfterLoginService]},
  {path: 'admin', component: AdminComponent, canActivate:[AfterLoginService]},
  {path: 'vendor-home', component: HomeVendorComponent, canActivate:[AfterLoginService]},
  {path:'search/:q',component:SearchComponent, canActivate:[AfterLoginService]},
  {path: 'menu', component: MenuComponent, canActivate:[AfterLoginService]},
  {path: 'vendor-signup', component: VendorSignupComponent },
  {path:'schedule',component:ScheduleComponent, canActivate:[AfterLoginService]},
  {path:'vendor/:id',component:ProfileComponent, canActivate:[AfterLoginService]},
  {path:'cart',component: CartComponent,  canActivate:[AfterLoginService]},
  {path:'account',component: MyaccountComponent, canActivate:[AfterLoginService]},
  {path:' ',component: OrderHistoryComponent, canActivate:[AfterLoginService]},
  {path:'choose-location',component: ChooseLocationComponent, canActivate:[AfterLoginService]},
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
