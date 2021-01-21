import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from './services/token.service';
@Injectable({
  providedIn: 'root'
})
export class AfterLoginForVendorService implements CanActivate{

  constructor(private router: Router, private token: TokenService) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    let validatRole =  localStorage.getItem("role") == "vendor" ? true:false;
    if(!this.token.loggedIn()||!validatRole) {
     this.router.navigate(['signin']);
    }
   return this.token.loggedIn() && validatRole; 
 }
}
