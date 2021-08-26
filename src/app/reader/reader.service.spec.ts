import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ReaderService } from './reader.service';
import { HandleError, HttpErrorHandler } from '../common/http-error-handler.service';
import { readerStub } from '../../test/reader.stub';

describe('ReaderService', () => {
  let readerService: ReaderService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let errorHandlerSpy: jasmine.SpyObj<HttpErrorHandler>
  let handleError: HandleError;

  beforeEach(() => {
    //Mock the HttpErrorHandle service, also handleError function
    const spy = jasmine.createSpyObj('HttpErrorHandler', ['createHandleError', 'handleError']);
    spy.createHandleError.and.callFake(function (serviceName) {
      return (operation, result) => this.handleError(serviceName, operation, result);
    });
    //Initiate the testing module
    TestBed.configureTestingModule({
      providers: [
        ReaderService,
        {
          provide: HttpErrorHandler,
          useValue: spy,
        },
      ],
      imports: [HttpClientTestingModule]
    });
    //Inject all the dependants
    readerService = TestBed.inject(ReaderService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    errorHandlerSpy = TestBed.inject(HttpErrorHandler) as jasmine.SpyObj<HttpErrorHandler>;
    handleError = errorHandlerSpy.createHandleError('ReaderService');
  });

  afterEach(() => {
    //Verify if the http service was called correctly
    httpTestingController.verify();
  })

  it('ReaderService should be created', () => {
    expect(readerService).toBeTruthy();
  });

  describe('getReadHistory', () => {
    it('should return an Observable<ReaderReadHistory>', () => {
      const dummyRecord = readerStub().readHistory

      readerService.getReadHistory(readerStub()._id).subscribe((record) => {
        expect(record.length).toBe(1);
        expect(record).toBe(dummyRecord);
      });
      //Mock http request with expectOne
      const req = httpTestingController.expectOne(`/api/reader/${readerStub()._id}/getreadhistory`);
      expect(req.request.method).toEqual('GET');
      //set up response with mock data
      req.flush(dummyRecord);
    })
  })

  describe('addFavorBook', () => {
    it('should return an Observable<listLength>', () => {
      const dummyLength = 2;
      const favorBookDto = {
        bookID: readerStub().favouriteBook[0].bookID,
      }

      readerService.addFavorBook(readerStub()._id, favorBookDto).subscribe((result) => {
        expect(result).toBe(dummyLength);
      });
      //Mock http request with expectOne
      const req = httpTestingController.expectOne(`/api/reader/${readerStub()._id}/addfavourbook`);
      expect(req.request.method).toEqual('POST');
      //set up response with mock data
      req.flush(dummyLength);
    })
  })

  describe('getFavorList', () => {
    it('should return an Observable<FavorBook[]>', () => {
      const dummyRecord = readerStub().favouriteBook;

      readerService.getFavorList(readerStub()._id).subscribe((record) => {
        expect(record.length).toBe(1);
        expect(record).toBe(dummyRecord);
      });
      //Mock http request with expectOne
      const req = httpTestingController.expectOne(`/api/reader/${readerStub()._id}/getfavourlist`);
      expect(req.request.method).toEqual('GET');
      //set up response with mock data
      req.flush(dummyRecord);
    })
  })
});
