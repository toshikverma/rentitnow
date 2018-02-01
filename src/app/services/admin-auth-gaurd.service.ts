import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AdminAuthGaurd implements CanActivate {
  userDetails: any;
  jwtHelper: any;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
   this.jwtHelper=new JwtHelper();
    this.userDetails= this.jwtHelper.decodeToken(localStorage.getItem("token"));
    if(this.userDetails.userType==3)
    return true;
    this.router.navigate(['/accessdenied']);
    return false;
  }

  constructor(private router:Router) { }

}
