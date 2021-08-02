import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
//import { Router } from '@angular/router';

import { ReaderAuthService } from '../auth/reader-auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AccessToken } from '../common/reader.dto';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private readerAuthService: ReaderAuthService,
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
    if (!accessToken) {
      return next.handle(req);
    }
    if (this.readerAuthService.isLoggedIn()) {
      const tokenBearer = `Bearer ${accessToken}`;
      const authReq = req.clone({ setHeaders: { Authorization: tokenBearer } });
      return next.handle(authReq);
    }
    this.readerAuthService.getTokenWithRefresh().subscribe((data: AccessToken)=>{
      const username = this.tokenService.getUsername();
      if (username){
        this.tokenService.saveToken(data, username);
      }
      const tokenBearer = `Bearer ${data.token_info}`;
      const authReq = req.clone({ setHeaders: { Authorization: tokenBearer } });
      return next.handle(authReq);
    })

    return next.handle(req);
  }
}