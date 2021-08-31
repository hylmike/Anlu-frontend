import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import * as moment from 'moment';

import { ReaderAuthService } from './reader-auth.service';
import { TokenStorageService } from './token-storage.service';
import { HttpErrorHandler } from '../common/http-error-handler.service';
import { accessTokenStub, readerStub } from 'src/test/reader.stub';
import { ChangePwdDto, RegisterReaderDto, UpdateReaderDto } from '../common/reader.dto';

describe('AuthService', () => {
  let readerAuthService: ReaderAuthService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const tokenSpy = jasmine.createSpyObj('TokenStorageService', ['getToken', 'getUsername', 'getExpiration']);
    tokenSpy.getToken.and.returnValue(accessTokenStub().token_info);
    tokenSpy.getUsername.and.returnValue(readerStub().username);
    tokenSpy.getExpiration.and.returnValue(moment().add(5, 'days'));
    const handlerSpy = jasmine.createSpyObj('HttpErrorHandler', ['createHandleError', 'handleError']);
    handlerSpy.createHandleError.and.callFake(function (serviceName) {
      return (operation, result) => this.handleError(serviceName, operation, result);
    })
    const logSpy = jasmine.createSpyObj('NGXLogger', ['info', 'warn', 'error']);

    TestBed.configureTestingModule({
      providers: [
        ReaderAuthService,
        {
          provide: TokenStorageService,
          useValue: tokenSpy,
        },
        {
          provide: HttpErrorHandler,
          useValue: handlerSpy,
        },
        {
          provide: NGXLogger,
          useValue: logSpy,
        }
      ],
      imports: [
        HttpClientTestingModule,
      ]
    });
    readerAuthService = TestBed.inject(ReaderAuthService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(readerAuthService).toBeTruthy();
  });

  describe('register', () => {
    it('should send POST http request and return an Observable<Reader>', () => {
      const dummyReader = readerStub();
      const registerData: RegisterReaderDto = {
        username: readerStub().username,
        password: readerStub().password,
        confirmPassword: readerStub().password,
        email: readerStub().email,
        firstName: readerStub().readerProfile.firstName,
        lastName: readerStub().readerProfile.lastName,
        gender: readerStub().readerProfile.gender,
        birthday: readerStub().readerProfile.birthday.toString(),
        phoneNumber: readerStub().readerProfile.phoneNumber,
        homeAddress: readerStub().readerProfile.address.homeAddress,
        province: readerStub().readerProfile.address.province,
        postcode: readerStub().readerProfile.address.postcode,
        securityQuestion: readerStub().readerProfile.securityQuestion,
        securityAnswer: readerStub().readerProfile.securityAnswer,
      }

      readerAuthService.register(registerData).subscribe((reader) => {
        expect(reader).toEqual(dummyReader);
      })
      const req = httpTestingController.expectOne('api/reader/register');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyReader);
    })
  })

  describe('getReader', () => {
    it('should send GET http request and return an Observable<Reader>', () => {
      const dummyReader = readerStub();

      readerAuthService.getReader(readerStub()._id).subscribe((reader) => {
        expect(reader).toEqual(dummyReader);
      })
      const req = httpTestingController.expectOne(`api/reader/${readerStub()._id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummyReader);
    })
  })

  describe('updateProfile', () => {
    it('should send PATCH http request and return Observable<ReaderID>', () => {
      const dummyReaderID = readerStub()._id;
      const updateReaderDto: UpdateReaderDto = {
        username: readerStub().username,
        email: 'email@email',
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        phoneNumber: '',
        homeAddress: 'homeAddress',
        province: '',
        postcode: '',
        securityQuestion: '',
        securityAnswer: '',
      };

      readerAuthService.updateProfile(updateReaderDto).subscribe((readerID) => {
        expect(readerID).toEqual(dummyReaderID);
      })
      const req = httpTestingController.expectOne(`api/reader/update`);
      expect(req.request.method).toEqual('PATCH');
      req.flush(dummyReaderID);
    })
  })

  describe('changePwd', () => {
    it('should send PATCH http request and return an Observable<username>', () => {
      const dummyName = readerStub().username;
      const changePwdDto: ChangePwdDto = {
        username: readerStub().username,
        currentPassword: readerStub().password,
        newPassword: 'newPass',
        confirmPassword: 'newPass',
      };

      readerAuthService.changePwd(changePwdDto).subscribe((result) => {
        expect(result).toEqual(dummyName);
      })
      const req = httpTestingController.expectOne('api/reader/changepwd');
      expect(req.request.method).toEqual('PATCH');
      req.flush(dummyName);
    })
  })

  describe('signIn', () => {
    it('should send POST http request and return an Observable<accessToken>', () => {
      const dummyToken = accessTokenStub();

      readerAuthService.signIn('username', 'password').subscribe((token) => {
        expect(token).toEqual(dummyToken);
      })
      const req = httpTestingController.expectOne('/api/reader/login');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyToken);
    })
  })

  describe('signOut', () => {
    it('should send DELETE http request and return an Observable<ReaderID>', () => {
      const dummyID = readerStub()._id;

      readerAuthService.signOut().subscribe((result) => {
        expect(result).toEqual(dummyID);
      })
      const req = httpTestingController.expectOne('/api/reader/logout');
      expect(req.request.method).toEqual('DELETE');
      req.flush(dummyID);
    })
  })

  describe('getTokenWithRefresh', () => {
    it('should send POST http request and return an Observable<accessToken>', () => {
      const dummyToken = accessTokenStub();

      readerAuthService.getTokenWithRefresh().subscribe((result) => {
        expect(result).toEqual(dummyToken);
      })
      const req = httpTestingController.expectOne('/api/reader/refresh');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyToken);
    })
  })

  describe('isLoggedIn', () => {
    it('should return an boolean', () => {
      const dummyResult = true;

      const result = readerAuthService.isLoggedIn()
      expect(result).toEqual(dummyResult);
    })
  })

  describe('getReaderID', () => {
    it('should decode accessToken and return correct readerID', () => {
      const readerID = readerStub()._id;

      const result = readerAuthService.getReaderID()
      expect(result).toEqual(readerID);
    })
  })
});
