import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

import { AccessToken, RegisterLibDto, ChangePwdDto, UpdateLibDto } from '../common/lib.dto';
import { HandleError, HttpErrorHandler } from '../common/http-error-handler.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LibrarianAuthService {
  redirectUrl: string | null = null;
  private handleError: HandleError;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenStorageService,
    private logger: NGXLogger,
    httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = httpErrorHandler.createHandleError('LibrarianAuthService');
  }

  //Only admin can register the librarian
  register(registerLib: RegisterLibDto): Observable<any> {
    return this.http.post('api/lib/register', registerLib).pipe(
      catchError(this.handleError('register')), shareReplay()
    );
  }

  //Only admin can review the librarian profile
  getProfile(libID: string): Observable<any> {
    return this.http.get(`api/lib/get/${libID}`).pipe(
      catchError(this.handleError('getLibProfile')), shareReplay()
    );
  }

  //Only admin can manage the admin account info
  getAllAdmin(): Observable<any> {
    return this.http.get('api/lib/getalladmin').pipe(
      catchError(this.handleError('getLibProfile')), shareReplay()
    );
  }

  //Only admin can manage the librarian account info
  getAllLib(): Observable<any> {
    return this.http.get('api/lib/getalllib').pipe(
      catchError(this.handleError('getLibProfile')), shareReplay()
    );
  }

  //Only admin can update the librarian profile, including password
  updateProfile(updateProfile: UpdateLibDto): Observable<any> {
    return this.http.patch('api/lib/update', updateProfile).pipe(
      catchError(this.handleError('updateProfile')), shareReplay()
    );
  }

  //Only admin can update the librarian profile, including password
  changePwd(changePwd: ChangePwdDto): Observable<any> {
    return this.http.patch('api/lib/changepwd', changePwd).pipe(
      catchError(this.handleError('updatePassword')), shareReplay()
    );
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<AccessToken>('/api/lib/liblogin', { username: username, password: password }).pipe(
      //retry(3),
      catchError(this.handleError('libLogin')), shareReplay()
    )
  }

  signOut(): Observable<any> {
    return this.http.delete('/api/lib/logout')
      .pipe(catchError(this.handleError('libLogout')), shareReplay())
  }

  getTokenWithRefresh(): Observable<any> {
    return this.http.post<AccessToken>('/api/lib/refresh', {}).pipe(
      catchError(this.handleError('getTokenWithRefresh')), shareReplay()
    );
  }

  deleteLib(libID: string): Observable<any> {
    return this.http.delete(`/api/lib/delete/${libID}`, ).pipe(
      catchError(this.handleError('deleteLib')), shareReplay()
    );
  }

  isLoggedIn(): boolean {
    if (this.tokenService.getToken()) {
      const libInd = this.tokenService.getUsername().slice(0, 3);
      if (libInd === '$L_') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getLibID(): string {
    const token = this.tokenService.getToken();
    if (token) {
      const username = this.tokenService.getUsername();
      if (username.slice(0, 3) === '$A_' || username.slice(0, 3) === '$L_') {
        const libInfo = JSON.parse(this.urlBase64Decode(token.split('.')[1]));
        this.logger.info(`Success get lib id: ${libInfo.libID}`);
        if (libInfo) return libInfo.libID;
      }
    }
    //If not signed in as lib or admin, get id failed
    this.logger.warn('User has not signed in, get libID failed');
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

