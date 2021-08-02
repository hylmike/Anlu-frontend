import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

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
    httpErrorHandler: HttpErrorHandler,
  ) { 
    this.handleError = httpErrorHandler.createHandleError('LibrarianAuthService');
  }

  //Only admin can register the librarian
  register(registerLib: RegisterLibDto): Observable<any> {
    return this.http.post('api/librarian/register', registerLib).pipe(
      catchError(this.handleError('register')), shareReplay()
    );
  }

  //Only admin can update the librarian profile, including password
  updateProfile(updateProfile: UpdateLibDto): Observable<any> {
    return this.http.post('api/librarian/update', updateProfile).pipe(
      catchError(this.handleError('updateProfile')), shareReplay()
    );
  }

  //Only admin can update the librarian profile, including password
  updatePwd(changePwd: ChangePwdDto): Observable<any> {
    return this.http.post('api/librarian/changpwd', changePwd).pipe(
      catchError(this.handleError('updatePassword')), shareReplay()
    );
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<AccessToken>('/api/librarian/login', { username: username, password: password }).pipe(
      //retry(3),
      catchError(this.handleError('signIn')), shareReplay()
    )
  }

  signOut(): Observable<any> {
    return this.http.delete('/api/librarian/logout')
      .pipe(catchError(this.handleError('signOut')), shareReplay())
  }

  getTokenWithRefresh(): Observable<any> {
    return this.http.post<AccessToken>('/api/librarian/refresh', {}).pipe(
      catchError(this.handleError('getTokenWithRefresh')), shareReplay()
    )
  }

  isLoggedIn(): boolean {
    if (
      this.tokenService.getToken() &&
      moment().isBefore(this.tokenService.getExpiration())
    ) {
      return true;
    }
    return false;
  }

  /*
  private errorHandle(error: HttpErrorResponse) {
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred in client side: ', error.error.message);
      errorMessage = `Client side error: ${error.error.message}`;
    } else if (error.status === 401) {
      console.log(`Error code: ${error.status}, message is ${error.message}.`);
      if (error.error.message.includes('Incorrect username or password')) {
        window.alert('Incorrect username or password, please check')
        //window.location.reload();
        return throwError('Incorrect username or password, please try agian later');
      } else {
        window.alert('Need login to access the contents.')
        this.router.navigateByUrl('/librarian/login');
      }
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}, message: ${error.message}.`);
      errorMessage = `Backend error, error code ${error.status}, message: ${error.message}.`
    }
    //window.alert(errorMessage)
    return throwError('Some error happened, please try again later');
  }
  */
}

