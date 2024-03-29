import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate{

  constructor(private token: TokenService, private router: Router) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    let validatRole =  localStorage.getItem("role") == "customer" ? true:false; 
    if(!this.token.loggedIn()||!validatRole) {
      this.router.navigate(['signin']);
     }
     return this.token.loggedIn() && validatRole; 
  }
}
