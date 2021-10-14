import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, tap, switchMap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger'

import { ReaderAuthService } from '../auth/reader-auth.service';
import { LibrarianAuthService } from '../auth/librarian-auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AccessToken } from '../common/reader.dto';
import { Router } from '@angular/router';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private readerAuthService: ReaderAuthService,
    private libAuthService: LibrarianAuthService,
    private tokenService: TokenStorageService,
    private router: Router,
    private logger: NGXLogger,
  ) { }

  refreshTokenInProgress = false;
  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            //console.log(`Error code: ${error.status}, message is ${error.message}.`)
            return this.handleUnauthError(request, next);
          }
        }
        return throwError(error);
      }));
  }

  private handleUnauthError(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    //If last attempt is login or refresh failed, jump to throw error
    if (req.url.includes('login')) {

      return next.handle(req);
    }

    //If access token expired, use refresh token generate new access token
    return this.refreshToken().pipe(
      switchMap(() => {
        req = this.setAuthHeader(req);
        return next.handle(req);
      }),
      catchError((err) => {
        if (err.status !== 401) {
          return throwError(err);
        } else if (req.url.includes('refresh')) {
          this.logout();
        }

      })
    );
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      const username = this.tokenService.getUsername();
      const roleInd = username.slice(0, 3);
      if (roleInd === '$A_' || roleInd === '$L_') {
        return this.libAuthService.getTokenWithRefresh().pipe(
          tap((data) => {
            this.refreshTokenInProgress = false;
            this.tokenRefreshedSource.next();
            this.tokenService.saveToken(data, username);
            this.logger.info('Reader refresh token success');
          }),
          catchError((err) => {
            this.refreshTokenInProgress = false;
            this.logger.warn(`Lib Token refresh failed: ${err}`);
            this.logout();
            return throwError(err);
          }));
      } else {
        return this.readerAuthService.getTokenWithRefresh().pipe(
          tap((data) => {
            this.refreshTokenInProgress = false;
            this.tokenRefreshedSource.next();
            this.tokenService.saveToken(data, username);
            this.logger.info('Reader refresh token success');
          }),
          catchError((err) => {
            this.refreshTokenInProgress = false;
            this.logger.warn(`Lib Token refresh failed: ${err}`);
            this.logout();
            return throwError(err);
          }));
      }
    }
  }

  setAuthHeader(req: HttpRequest<any>) {
    const accessToken = this.tokenService.getToken();
    if (accessToken) {
      const tokenBearer = `Bearer ${accessToken}`;
      const authReq = req.clone({ setHeaders: { Authorization: tokenBearer } });
      return authReq;
    }
  }

  logout() {
    const username = this.tokenService.getUsername();
    this.tokenService.clearToken();
    this.readerAuthService.signOut().subscribe();
    const roleInd = username.slice(0, 3);
    if (roleInd === '$A_' || roleInd === '$L_') {
      this.router.navigateByUrl('/lib/login');
    } else {
      this.router.navigateByUrl('/');
    }
  }
}