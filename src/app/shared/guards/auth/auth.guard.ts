import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthUser } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authUser: AuthUser = JSON.parse(this.cookieService.get('authUser') || '{}');

    if (Object.keys(authUser).length === 0) {
      return this.router.parseUrl('sign-in') as UrlTree;
    }

    if (authUser?.email === 'hanneh.hanami@gmail.com' || authUser?.email === 'zidoniratatoy@gmail.com' || authUser?.email === 'robindalmy@gmail.com' || authUser?.email === 'team.se7en.org@gmail.com') {
      return true;
    }

    return this.router.parseUrl('unauthorized') as UrlTree;
  }

}
