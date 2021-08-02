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
    return this.http.post<AccessToken>('/api/admin/login', { username: username, password: password }).pipe(
      //retry(3),
      catchError(this.handleError('signIn')), shareReplay()
    )
  }

  isLoggedIn(): boolean {
    const adminInd = this.tokenService.getUsername().slice(0,3) || '';
    if (
      this.tokenService.getToken() &&
      moment().isBefore(this.tokenService.getExpiration()) &&
      adminInd==='$A_'
    ) {
      return true;
    }
    return false;
  }

}