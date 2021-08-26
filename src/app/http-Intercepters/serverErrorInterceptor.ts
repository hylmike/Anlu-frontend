import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger'

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
    private logger: NGXLogger,
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
    //If last attempt is login or refresh failed, jump to throw error
    if (req.url.includes('login') || req.url.includes('refresh')) {
      if (req.url.includes('refresh')) {
        this.libAuthService.signOut().subscribe((data)=>{
          if (data) {
            this.logger.info('Susscess logout the past user after refresh token failed');
          } else {
            this.logger.info('Logout the past user failed after refresh token failed');
          }
        });
      }
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
        if (data && data.token_info) {
          console.log('refresh success?')
          this.tokenService.saveToken(data, username);
          tokenBearer = `Bearer ${data.token_info}`;
        } else {
          return next.handle(req);
        }
      })
    } else {
      this.readerAuthService.getTokenWithRefresh().subscribe((data: AccessToken) => {
        if (data && data.token_info) {
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