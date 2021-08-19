import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {

  constructor(
    private router: Router,
    private logger: NGXLogger,
  ) { }

  createHandleError = (serviceName = '') => {
    return <T>(operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result)
  }

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      //Generate error message
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client side error: ${error.error.message}`;
      } else if (error.status === 401) {
        errorMessage = `Server return ${error.status} with body "${error.error}"`;
        if (error.error.message.includes('Incorrect username or password')) {
          window.alert('Incorrect username or password, please check');
        } else {
          window.alert('Need login to access the contents.');
          if (serviceName.toLowerCase().indexOf('reader') != -1) {
            this.router.navigateByUrl('/reader/login');
          } else {
            this.router.navigateByUrl('/librarian/login');
          }

        }
      } else {
        errorMessage = `Server return ${error.status} with body "${error.error}"`;
      }
      //Generate user friendly error log
      const errorLog = `HTTP Error in ${serviceName}: ${operation} failed: ${errorMessage}`;

      // TODO: send the error to remote logging infrastructure
      this.logger.error(errorLog);

      return of(result);
    };
  }
}
