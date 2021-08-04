import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
//import { Router } from '@angular/router';

import { ReaderAuthService } from '../auth/reader-auth.service';
import { LibrarianAuthService } from '../auth/librarian-auth.service';
import { AdminAuthService } from '../auth/admin-auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AccessToken } from '../common/reader.dto';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private readerAuthService: ReaderAuthService,
    private libAuthService: LibrarianAuthService,
    private adminAuthService: AdminAuthService,
    private tokenService: TokenStorageService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
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
    //If not login yet, direct process request
    if (!accessToken) {
      return next.handle(req);
    }
    //If logined but no access token in req, add access token in req
    if (this.readerAuthService.isLoggedIn() || this.libAuthService.isLoggedIn() || this.adminAuthService.isLoggedIn()) {
      const tokenBearer = `Bearer ${accessToken}`;
      const authReq = req.clone({ setHeaders: { Authorization: tokenBearer } });
      return next.handle(authReq);
    }
    //If access token expired, use refresh token generate new access token
    const username = this.tokenService.getUsername();
    const roleInd = username.slice(0, 3);
    let tokenBearer: string;
    if (roleInd === '$A_' || roleInd === '$L_') {
      this.libAuthService.getTokenWithRefresh().subscribe((data: AccessToken) => {
        if (data) {
          this.tokenService.saveToken(data, username);
          tokenBearer = `Bearer ${data.token_info}`;
        } else {
          return next.handle(req);
        }
      })
    } else {
      this.readerAuthService.getTokenWithRefresh().subscribe((data: AccessToken) => {
        if (data) {
          this.tokenService.saveToken(data, username);
          tokenBearer = `Bearer ${data.token_info}`;
        } else {
          return next.handle(req);
        }
      })
    }
    const authReq = req.clone({ setHeaders: { Authorization: tokenBearer } });
    return next.handle(authReq);
  }
}