import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { Blog, BlogDto } from '../common/blog.dto';
import { HttpErrorHandler, HandleError } from '../common/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  handleError: HandleError;

  constructor(
    private http: HttpClient,
    errorHandler: HttpErrorHandler
  ) {
    this.handleError = errorHandler.createHandleError('BlogService');
   }

  create(regBlogDto:BlogDto): Observable<any> {
    return this.http.post<Blog>('/api/blog/create', regBlogDto).pipe(
      catchError(this.handleError('blogRegister')), shareReplay()
    );
  }

  update(blogID, updateBlogDto:BlogDto): Observable<any> {
    return this.http.patch<Blog>(`/api/blog/update/${blogID}`, updateBlogDto).pipe(
      catchError(this.handleError('blogUpdate')), shareReplay()
    );
  }

  getBlog(blogID): Observable<any> {
    return this.http.get<Blog>(`/api/blog/get/${blogID}`).pipe(
      catchError(this.handleError('getBlog')), shareReplay()
    );
  }

  getLatest(num): Observable<any> {
    return this.http.get<Blog[]>(`/api/blog/getlatest/${num}`).pipe(
      catchError(this.handleError('getLatestBlog')), shareReplay()
    );
  }

  delBlog(blogID): Observable<any> {
    return this.http.delete(`/api/blog/del/${blogID}`).pipe(
      catchError(this.handleError('delBlog')), shareReplay()
    );
  }
}
