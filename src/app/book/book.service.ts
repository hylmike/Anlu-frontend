import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { RegisterBook, Book, SearchBookDto, BookCommentDto, BookComment } from '../common/book-dto';
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

  register(registerBook: RegisterBook): Observable<any> {
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
    return this.http.get<Book>(`/api/book/${bookID}`).pipe(
      catchError(this.handleError('getBook')), shareReplay()
    )
  }

  findAllBook(format: string): Observable<any> {
    return this.http.get<Book[]>(`/app/book/findall/${format}`).pipe(
      catchError(this.handleError('findAllBook')), shareReplay()
    )
  }

  findBookList(searchBookDto: SearchBookDto): Observable<any> {
    return this.http.post<Book[]>(`/app/book/findlist`, searchBookDto).pipe(
      catchError(this.handleError('findBookList')), shareReplay()
    )
  }

  addBookComment(addCommentDto: BookCommentDto): Observable<any> {
    return this.http.post<BookComment>('/app/book/addComment', addCommentDto).pipe(
      catchError(this.handleError('addBookComment')), shareReplay()
    )
  }

}
