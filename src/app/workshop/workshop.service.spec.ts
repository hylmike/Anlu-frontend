import { HttpClient, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { readerStub } from 'src/test/reader.stub';
import { subscriberStub, workshopStub } from 'src/test/workshop.stub';
import { HandleError, HttpErrorHandler } from '../common/http-error-handler.service';
import { RegisterWorkshopDto, SubWorkshopDto, UnsubWorkshopDto, UpdateWorkshopDto, Workshop } from '../common/workshop.dto';

import { WorkshopService } from './workshop.service';

describe('WorkshopService', () => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fileUpload', () => {
    it('should send POST http request and return file url', (done: DoneFn) => {
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

  describe('register', () => {
    it('should send POST request and return an Observable<Workshop>', () => {
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

  describe('getWorkshop', () => {
    it('should send get request and return an Observable<Workshop>', () => {
      const dummyWs = workshopStub();

      service.getWorkshop(workshopStub()._id).subscribe((workshop) => {
        expect(workshop).toEqual(dummyWs);
      })
      const req = httpTestingController.expectOne(`/api/workshop/profile/${workshopStub()._id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummyWs);
    })
  })

  describe('getWsList', () => {
    it('should send get request and return an Observable<Workshop>', () => {
      const dummyWsList = [workshopStub()];

      service.getWsList(3).subscribe((wsList) => {
        expect(wsList).toEqual(dummyWsList);
      })
      const req = httpTestingController.expectOne('/api/workshop/get/3');
      expect(req.request.method).toEqual('GET');
      req.flush(dummyWsList);
    })
  })

  describe('updateWorkshop', () => {
    it('should send PATCH request and return an Observable<Workshop>', () => {
      const dummyWs = workshopStub();
      const updateWsDto: UpdateWorkshopDto = {
        topic: workshopStub().topic,
        place: 'newPlace',
        organizer: workshopStub().organizer,
        startTime: 'newTime',
        duration: workshopStub().duration.toString(),
        poster: workshopStub().poster,
        remark: workshopStub().remark,
      };

      service.updateWorkshop(workshopStub()._id, updateWsDto).subscribe((workshop) => {
        expect(workshop).toEqual(dummyWs);
      })
      const req = httpTestingController.expectOne(`/api/workshop/update/${workshopStub()._id}`);
      expect(req.request.method).toEqual('PATCH');
      req.flush(dummyWs);
    })
  })

  describe('delWorkshop', () => {
    it('should send delete request and return an workshop id', () => {
      const dummyID = workshopStub()._id;

      service.delWorkshop(workshopStub()._id).subscribe((id) => {
        expect(id).toEqual(dummyID);
      })
      const req = httpTestingController.expectOne(`/api/workshop/del/${workshopStub()._id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(dummyID);
    })
  })

  describe('subWorkshop', () => {
    it('should send post request and return an sub', () => {
      const dummySub = subscriberStub();
      const subWsDto: SubWorkshopDto = {
        workshop: subscriberStub().workshop,
        readerID: subscriberStub().readerID,
      };

      service.subWorkshop(subWsDto).subscribe((sub) => {
        expect(sub).toEqual(dummySub);
      })
      const req = httpTestingController.expectOne('/api/workshop/subscribe');
      expect(req.request.method).toEqual('POST');
      req.flush(dummySub);
    })
  })

  describe('getSub', () => {
    it('should send GET request and return an sub', () => {
      const dummySub = subscriberStub();

      service.getSub(subscriberStub().readerID).subscribe((sub) => {
        expect(sub).toEqual(dummySub);
      })
      const req = httpTestingController.expectOne(`/api/workshop/getsub/${subscriberStub().readerID}`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummySub);
    })
  })

  describe('getSubList', () => {
    it('should send GET request and return an subList', () => {
      const dummySubList = [subscriberStub()];

      service.getSubList(workshopStub()._id).subscribe((subList) => {
        expect(subList).toEqual(dummySubList);
      })
      const req = httpTestingController.expectOne(`/api/workshop/getsublist/${workshopStub()._id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummySubList);
    })
  })

  describe('getSubName', () => {
    it('should send GET request and return sub reader name', () => {
      const dummySubName = readerStub().username;

      service.getSubName(subscriberStub()._id).subscribe((name) => {
        expect(name).toEqual(dummySubName);
      })
      const req = httpTestingController.expectOne(`/api/workshop/getsubname/${subscriberStub()._id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummySubName);
    })
  })

  describe('unsubWorkshop', () => {
    it('should send patch request and return an sub id', () => {
      const dummySubID = subscriberStub()._id;
      const unsubDto: UnsubWorkshopDto = {
        subID: subscriberStub()._id,
      };

      service.unsubWorkshop(workshopStub()._id, unsubDto).subscribe((subID) => {
        expect(subID).toEqual(dummySubID);
      })
      const req = httpTestingController.expectOne(`/api/workshop/unsubscribe/${workshopStub()._id}`);
      expect(req.request.method).toEqual('PATCH');
      req.flush(dummySubID);
    })
  })
});
