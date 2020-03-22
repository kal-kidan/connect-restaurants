import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { HomeComponent } from './home/home.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'customer-signup', component: CustomerRegistrationComponent},
  {path: 'home', component: HomeComponent},
  {path: 'customer-login', component: CustomerLoginComponent},
  {path: 'customer-home', component: CustomerHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
