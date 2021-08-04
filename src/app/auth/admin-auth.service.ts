import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { AccessToken } from '../common/reader.dto';
import { TokenStorageService } from './token-storage.service';
import { HttpErrorHandler, HandleError } from '../common/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  redirectUrl: string | null = null;
  private handleError: HandleError;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenStorageService,
    httpErrorHandler: HttpErrorHandler,
  ) { 
    this.handleError = httpErrorHandler.createHandleError('AdminAuthService');
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<AccessToken>('/api/lib/adminlogin', { username: username, password: password }).pipe(
      //retry(3),
      catchError(this.handleError('adminLogin')), shareReplay()
    )
  }

  isLoggedIn(): boolean {
    if (this.tokenService.getToken()) {
      const adminInd = this.tokenService.getUsername().slice(0,3);
      if (moment().isBefore(this.tokenService.getExpiration()) && adminInd==='$A_') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}