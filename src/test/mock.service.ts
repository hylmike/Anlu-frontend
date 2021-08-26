import { convertToParamMap } from "@angular/router";
import { readerStub } from "./reader.stub";

export const ReaderAuthServiceSpy = jasmine.createSpyObj('ReaderAuthService', [
  'register',
  'getReader',
  'updateProfile',
  'changePwd',
  'signIn',
  'signOut',
  'getTokenWithRefresh',
  'isLoggedin',
  'getReaderID',
  'redirectUrl',
])

export const LibAuthServiceSpy = jasmine.createSpyObj('LibrarianAuthService', [
  'register',
  'getProfile',
  'getAllAdmin',
  'getAllLib',
  'updateProfile',
  'changePwd',
  'signIn',
  'signOut',
  'getTokenWithRefresh',
  'deleteLib',
  'isLoggedin',
  'getLibID',
  'redirectUrl',
])

export const LoggerSpy = jasmine.createSpyObj('NGXLogger', ['info', 'warn', 'error']);

export const RouterSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

export const TokenServiceSpy = jasmine.createSpyObj('TokenStorageService', [
  'clearToken',
  'saveToken',
  'getToken',
  'getUsername',
  'getExpiration',
  'isExpired',
]);

export const ActivatedRouteStub = {
  snapshot: {
    paramMap: convertToParamMap({
      id: readerStub()._id,
    })
  }
}