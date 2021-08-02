import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ReaderAuthService } from './reader-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReaderAuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {
  constructor(
    private readonly readerAuthService: ReaderAuthService,
    private readonly router: Router,
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

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  checkLogin(url: string): true | UrlTree {
    //check if user already login
    if (this.readerAuthService.isLoggedIn()){
      return true;
    }
    //if not login, save url before redirection
    this.readerAuthService.redirectUrl = url;
    return this.router.parseUrl('/reader/login');
  }
}
