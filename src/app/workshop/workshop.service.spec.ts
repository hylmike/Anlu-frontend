import { HttpClient, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { skipWhile } from 'rxjs/operators';
import { workshopStub } from 'src/test/workshop.stub';
import { HandleError, HttpErrorHandler } from '../common/http-error-handler.service';
import { RegisterWorkshopDto } from '../common/workshop.dto';

import { WorkshopService } from './workshop.service';

fdescribe('WorkshopService', () => {
  let service: WorkshopService;
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
    TestBed.configureTestingModule({
      providers: [
        WorkshopService,
        HttpClient,
        {
          provide: HttpErrorHandler,
          useValue: spy,
        }
      ],
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(WorkshopService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    errorHandlerSpy = TestBed.inject(HttpErrorHandler) as jasmine.SpyObj<HttpErrorHandler>;
    handleError = errorHandlerSpy.createHandleError('WorkshopService');
  });

  afterEach(() => {
    //Verify if the http service was called correctly
    httpTestingController.verify();
  })

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fdescribe('fileUpload', () => {
    fit('should send POST http request and return file url', (done: DoneFn) => {
      const file = new File(['sample'], 'sample.txt', { type: 'text/plain' });
      service.fileUpload(file).subscribe((event) => {
        // Define what we expect after receiving the progress response
        if (event.type === HttpEventType.UploadProgress) {
          if (event.loaded > 0) {
            expect(event.loaded).toEqual(7);
            done();
          }
        }
      });
      const req = httpTestingController.expectOne('api/workshop/upload');
      expect(req.request.method).toEqual('POST');
      // Respond with a mocked UploadProgress HttpEvent
      req.event({ type: HttpEventType.UploadProgress, loaded: 7, total: 10 });
    })
  })

  fdescribe('register', () => {
    fit('should send POST request and return an Observable<Workshop>', () => {
      const dummyWs = workshopStub();
      const registerWsDto: RegisterWorkshopDto = {
        topic: workshopStub().topic,
        place: workshopStub().place,
        organizer: workshopStub().organizer,
        startTime: workshopStub().startTime.toString(),
        duration: workshopStub().duration.toString(),
        poster: workshopStub().poster,
        creator: workshopStub().creator,
        remark: workshopStub().remark,
      };

      service.register(registerWsDto).subscribe((workshop) => {
        expect(workshop).toEqual(dummyWs);
      })
      const req = httpTestingController.expectOne('/api/workshop/register');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyWs);
    })
  })
});
