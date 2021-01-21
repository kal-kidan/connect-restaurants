import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'; 
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AfterLoginForAdminService {

  constructor(private router: Router, private token: TokenService) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    let validatRole =  localStorage.getItem("role") == "admin" ? true:false;
    if(!this.token.loggedIn()||!validatRole) {
     this.router.navigate(['admin-login']);
    }
   return this.token.loggedIn() && validatRole; 
 }
}
