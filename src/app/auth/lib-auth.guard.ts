import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { LibrarianAuthService } from './librarian-auth.service';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LibAuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private librarianAuthService: LibrarianAuthService,
    private adminAuthService: AdminAuthService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree {
    if (this.librarianAuthService.isLoggedIn() || this.adminAuthService.isLoggedIn()) {
      return true;
    }

    this.librarianAuthService.redirectUrl = url;
    return this.router.parseUrl('/lib/login');
  }
}
