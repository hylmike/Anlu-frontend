import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { catchError } from 'rxjs/operators';
import { LoggerSpy, RouterSpy } from 'src/test/mock.service';
import { ReaderService } from '../reader/reader.service';

import { HandleError, HttpErrorHandler } from './http-error-handler.service';

describe('HttpErrorHandlerService', () => {
  let service: HttpErrorHandler;
  let routerSpy: jasmine.SpyObj<Router>;
  let readerService: ReaderService;
  let httpController: HttpTestingController;
  let http: HttpClient;
  let handleError: HandleError;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpErrorHandler,
        ReaderService,
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        },
        {
          provide: Router,
          useValue: RouterSpy,
        },
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpErrorHandler);
    httpController = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    readerService = TestBed.inject(ReaderService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    handleError = service.createHandleError('TestService');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
