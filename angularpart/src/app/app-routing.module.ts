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

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'signup', component: CustomerRegistrationComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signin', component: LoginComponent, canActivate:[BeforeLoginService]},
  {path: 'customer-home', component: CustomerHomeComponent, canActivate:[AfterLoginService]},
  {path: 'admin', component: AdminComponent},
  {path: 'vendor-home', component: HomeVendorComponent, canActivate:[AfterLoginService]},
  {path: 'menu', component: MenuComponent, canActivate:[AfterLoginService]},
  {path: 'vendor-signup', component: VendorSignupComponent },
  {path:'schedule',component:ScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
