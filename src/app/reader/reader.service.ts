import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { Book } from '../common/book-dto';

import { HandleError, HttpErrorHandler } from '../common/http-error-handler.service';
import { emailDto, FavorBookDto, ReaderReadHistory, ResetPwdDto } from '../common/reader.dto';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = httpErrorHandler.createHandleError('ReaderService');
  }

  getReadHistory(readerID: string): Observable<any> {
    return this.http.get<ReaderReadHistory[]>(`/api/reader/${readerID}/getreadhistory`).pipe(
      catchError(this.handleError('getReadHistory')), shareReplay()
    )
  }

  getReadBooks(readerID: string): Observable<any> {
    return this.http.get<Book[]>(`/api/reader/${readerID}/getreadbooks`).pipe(
      catchError(this.handleError('getReadBooks')), shareReplay()
    )
  }

  addFavorBook(readerID: string, favorBookDto: FavorBookDto): Observable<any> {
    return this.http.post(`/api/reader/${readerID}/addfavourbook`, favorBookDto).pipe(
      catchError(this.handleError('addFavorBook')), shareReplay()
    )
  }

  getFavorList(readerID): Observable<any> {
    return this.http.get<Book[]>(`/api/reader/${readerID}/getfavourlist`).pipe(
      catchError(this.handleError('getFavorBookList')), shareReplay()
    )
  }

  delFavorBook(readerID: string, favorBookDto: FavorBookDto): Observable<any> {
    return this.http.patch(`/api/reader/${readerID}/delfavourbook`, favorBookDto).pipe(
      catchError(this.handleError('delFavorBook')), shareReplay()
    )
  }

  getTopN(num): Observable<any> {
    return this.http.get<Book[]>(`/api/reader/gettopn/${num}`).pipe(
      catchError((err) => this.handleError('getTopNReader')(err)), shareReplay()
    )
  }

  verifyEmail(input: emailDto): Observable<any> {
    return this.http.post('/api/reader/verifyemail', input).pipe(
      catchError(this.handleError('verifyEmail')), shareReplay()
    )
  }

  sendResetEmail(input: emailDto): Observable<any> {
    return this.http.post('/api/emailer/sendresetmail', input).pipe(
      catchError((err) => this.handleError('sendResetEmail')(err)), shareReplay()
    )
  }

  resetPwd(resetPwdDto: ResetPwdDto): Observable<any> {
    return this.http.patch('/api/reader/resetpwd', resetPwdDto).pipe(
      catchError(this.handleError('resetPwd')), shareReplay()
    )
  }
}
