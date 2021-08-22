import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../common/http-error-handler.service';
import { RegisterWorkshopDto, Subscriber, SubWorkshopDto, UnsubWorkshopDto, Workshop } from '../common/workshop.dto';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
  ) { 
    this.handleError = httpErrorHandler.createHandleError('ReaderService');
  }

  fileUpload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('api/workshop/upload', formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError(this.handleError('workshopFileUpload')), shareReplay()
    );
  }

  register(regWorkshopDto: RegisterWorkshopDto): Observable<any> {
    return this.http.post<Workshop>('/api/workshop/register', regWorkshopDto).pipe(
      catchError(this.handleError('workshopRegister')), shareReplay()
    );
  }

  getAllWorkshop(): Observable<any> {
    return this.http.get<Workshop[]>('/api/workshop/getall').pipe(
      catchError(this.handleError('getAllWorkshop')), shareReplay()
    );
  }

  subWorkshop(subworkshopDto: SubWorkshopDto): Observable<any> {
    return this.http.post<Subscriber>('/api/workshop/subscribe', subworkshopDto).pipe(
      catchError(this.handleError('subWorkshop')), shareReplay()
    );
  }

  getSub(readerID): Observable<any> {
    return this.http.get<Subscriber>(`/api/workshop/getsub/${readerID}`).pipe(
      catchError(this.handleError('getSub')), shareReplay()
    );
  }

  getSubList(workshopID): Observable<any> {
    return this.http.get<Subscriber[]>(`/api/workshop/getsublist/${workshopID}`).pipe(
      catchError(this.handleError('getSubList')), shareReplay()
    );
  }

  unsubWorkshop(workshopID, unsubWsDto: UnsubWorkshopDto): Observable<any> {
    return this.http.patch<Subscriber>(`/api/workshop/unsubscribe/${workshopID}`, unsubWsDto).pipe(
      catchError(this.handleError('unSubWorkshop')), shareReplay()
    );
  }
    
}
