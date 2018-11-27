import { AuthorizationService } from './../services/authorization.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

    constructor(private router: Router, private authorizationService: AuthorizationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authorizationService.getIsLoggedIn()) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
    }
}
