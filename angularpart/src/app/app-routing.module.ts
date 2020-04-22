import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { HomeComponent } from './home/home.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'customer-signup', component: CustomerRegistrationComponent},
  {path: 'home', component: HomeComponent},
  {path: 'customer-login', component: CustomerLoginComponent, canActivate:[BeforeLoginService]},
  {path: 'customer-home', component: CustomerHomeComponent, canActivate:[AfterLoginService]},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
