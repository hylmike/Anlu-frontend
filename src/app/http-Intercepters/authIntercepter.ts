import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import { ReaderAuthService } from '../auth/reader-auth.service';
import { LibrarianAuthService } from '../auth/librarian-auth.service';
import { AdminAuthService } from '../auth/admin-auth.service';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readerAuthService: ReaderAuthService,
    private libAuthService: LibrarianAuthService,
    private adminAuthService: AdminAuthService,
    private tokenService: TokenStorageService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.readerAuthService.isLoggedIn() || this.libAuthService.isLoggedIn() || this.adminAuthService.isLoggedIn()) {
      const accessToken = this.tokenService.getToken();
      if (accessToken) {
        const tokenBearer = `Bearer ${accessToken}`;
        const authReq = req.clone({ setHeaders: { Authorization: tokenBearer } });
        return next.handle(authReq);
      }
    }  
    
    return next.handle(req);
  }

}

