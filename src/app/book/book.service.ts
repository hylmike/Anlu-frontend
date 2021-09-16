import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { BookDto, Book, SearchBookDto, BookCommentDto, BookComment, ReadRecordDto, BookReadRecord } from '../common/book-dto';
import { HttpErrorHandler, HandleError } from '../common/http-error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = httpErrorHandler.createHandleError('BookService');
  }

  fileUpload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('api/book/upload', formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError(this.handleError('fileUpload')), shareReplay()
    );
  }

  register(registerBook: BookDto): Observable<any> {
    return this.http.post<Book>('/api/book/register', registerBook).pipe(
      catchError(this.handleError('register')), shareReplay()
    );
  }

  downloadBook(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      catchError(this.handleError('getEBook')), shareReplay()
    )
  }

  getBook(bookID: string): Observable<any> {
    return this.http.get<Book>(`/api/book/info/${bookID}`).pipe(
      catchError(this.handleError('getBook')), shareReplay()
    )
  }

  findAllBook(format: string): Observable<any> {
    return this.http.get<Book[]>(`/api/book/findall/${format}`).pipe(
      catchError(this.handleError('findAllBook')), shareReplay()
    )
  }

  findBookList(searchBookDto: SearchBookDto): Observable<any> {
    return this.http.post<Book[]>(`/api/book/findlist`, searchBookDto).pipe(
      catchError(this.handleError('findBookList')), shareReplay()
    )
  }

  searchBook(searchValue: string): Observable<any> {
    return this.http.get<Book[]>(`/api/book/searchbook?sval=${searchValue}`).pipe(
      catchError(this.handleError('searchBook')), shareReplay()
    )
  }

  findHotBooks(num: number): Observable<any> {
    return this.http.get<Book[]>(`/api/book/findhotbooks/${num}`).pipe(
      catchError(this.handleError('findHotBooks')), shareReplay()
    )
  }

  getInventorySum(): Observable<any> {
    return this.http.get(`/api/book/suminventory`).pipe(
      catchError(this.handleError('getBookInventorySummary')), shareReplay()
    )
  }

  updateBookInfo(updateBookDto: BookDto) {
    return this.http.patch<Book>('/api/book/update', updateBookDto).pipe(
      catchError(this.handleError('updateBookInfo')), shareReplay()
    )
  }

  delBook(bookID) {
    return this.http.delete(`/api/book/del/${bookID}`).pipe(
      catchError(this.handleError('delBook')), shareReplay()
    )
  }

  addBookComment(addCommentDto: BookCommentDto): Observable<any> {
    return this.http.post<BookComment>('/api/book/addcomment', addCommentDto).pipe(
      catchError(this.handleError('addBookComment')), shareReplay()
    )
  }

  getBookComments(bookID: string): Observable<any> {
    return this.http.get<BookComment[]>(`/api/book/${bookID}/getcomments`).pipe(
      catchError(this.handleError('getBookComments')), shareReplay()
    )
  }

  addReadRecord(readRecordDto: ReadRecordDto): Observable<any> {
    return this.http.post<BookReadRecord>('/api/book/addreadrecord', readRecordDto).pipe(
      catchError(this.handleError('addBookReadRecord')), shareReplay()
    )
  }

}
