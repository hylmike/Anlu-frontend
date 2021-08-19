import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { HandleError } from '../common/http-error-handler.service';
import { FavorBookDto, ReaderReadHistory } from '../common/reader.dto';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
  ) { }

  getReadHistory(readerID: string): Observable<any> {
    return this.http.get<ReaderReadHistory>(`/api/reader/${readerID}/getreadhistory`).pipe(
      catchError((err)=>this.handleError('getReadHistory')(err)), shareReplay()
    )
  }

  addFavorBook(readerID: string, favorBookDto: FavorBookDto): Observable<any> {
    return this.http.post(`/api/reader/${readerID}/addfavourbook`, favorBookDto).pipe(
      catchError((err)=>this.handleError('addFavorBook')(err)), shareReplay()
    )
  }

  getFavorList(readerID): Observable<any> {
    return this.http.get(`/api/reader/${readerID}/getfavourlist`).pipe(
      catchError((err)=>this.handleError('getFavorBookList')(err)), shareReplay()
    )
  }
}
