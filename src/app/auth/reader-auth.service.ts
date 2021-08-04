import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';
import { NGXLogger } from 'ngx-logger';

import { AccessToken, RegisterReaderDto, UpdateReaderDto, ChangePwdDto, Reader } from '../common/reader.dto';
import { TokenStorageService } from './token-storage.service';
import { HandleError, HttpErrorHandler } from '../common/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ReaderAuthService {
  //Add property to save address before redirect to login, can go after login
  redirectUrl: string | null = null;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
    private tokenService: TokenStorageService,
    httpErrorHandler: HttpErrorHandler,
  ) { 
    this.handleError = httpErrorHandler.createHandleError('ReaderAuthService');
  }

  register(registerUser: RegisterReaderDto): Observable<any> {
    return this.http.post('api/reader/register', registerUser).pipe(
      catchError(this.handleError('registerReader')), shareReplay()
    );
  }

  getReader(readerID: string): Observable<any> {
    return this.http.get<Reader>(`api/reader/${readerID}`).pipe(
      catchError(this.handleError('getReader')), shareReplay()
    )
  }

  updateProfile(updateReaderDto: UpdateReaderDto): Observable<any> {
    return this.http.patch('api/reader/update', updateReaderDto).pipe(
      catchError(this.handleError('updateReaderProfile')), shareReplay()
    );
  }

  changePwd(changePwd: ChangePwdDto): Observable<any> {
    return this.http.patch('api/reader/changepwd', changePwd).pipe(
      catchError(this.handleError('updateReaderPassword')), shareReplay()
    );
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<AccessToken>('/api/reader/login', { username: username, password: password }).pipe(
      //retry(3),
      catchError(this.handleError('readerLogin')), shareReplay()
    )
  }

  signOut(): Observable<any> {
    return this.http.delete('/api/reader/logout')
      .pipe(catchError(this.handleError('readerLogout')), shareReplay())
  }

  getTokenWithRefresh(): Observable<any> {
    return this.http.post<AccessToken>('/api/reader/refresh', {}).pipe(
      catchError(this.handleError('getTokenWithRefresh')), shareReplay()
    )
  }

  isLoggedIn(): boolean {
    if (this.tokenService.getToken()) {
      const roleInd = this.tokenService.getUsername().slice(0,3);
      if (roleInd === '$A_' || roleInd === '$L_') {
        return false
      } else if (moment().isBefore(this.tokenService.getExpiration())) {
        return true;
      }
    } else {
      return false;
    }
  }

  getReaderID(): string {
    if (this.isLoggedIn()) {
      const token = this.tokenService.getToken();
      const readerInfo = JSON.parse(this.urlBase64Decode(token.split('.')[1]));
      this.logger.info(`Success get reader id: ${readerInfo.readerID}`)
      if (readerInfo) return readerInfo.readerID;
    }
    this.logger.warn('User has not signed in, get readerID failed');
    return null;
  }

  private urlBase64Decode(str: string) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }
}
