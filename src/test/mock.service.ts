import { convertToParamMap } from "@angular/router";
import { readerStub } from "./reader.stub";

export const ReaderAuthServiceSpy = jasmine.createSpyObj('ReaderAuthService', [
  'register',
  'getReader',
  'getAllReader',
  'updateProfile',
  'changePwd',
  'deaReader',
  'actReader',
  'signIn',
  'signOut',
  'delReader',
  'getTokenWithRefresh',
  'isLoggedIn',
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
  'isLoggedIn',
  'getLibID',
  'redirectUrl',
]);

export const AdminAuthServiceSpy = jasmine.createSpyObj('AdminAuthService', [
  'signIn',
  'isLoggedIn',
]);

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

export const ReaderServiceSpy = jasmine.createSpyObj('ReaderService', [
  'getReadHistory',
  'getReadBooks',
  'addFavorBook',
  'getFavorList',
  'delFavorBook',
]);

export const BookServiceSpy = jasmine.createSpyObj('BookService', [
  'fileUpload',
  'register',
  'getBook',
  'findAllBook',
  'findBookList',
  'searchBook',
  'findHotBooks',
  'updateBookInfo',
  'delBook',
  'addBookComment',
  'getBookComments',
  'addReadRecord',
]);

export const BlogServiceSpy = jasmine.createSpyObj('BlogService', [
  'create',
  'update',
  'getBlog',
  'getLatest',
  'delBlog',
]);

export const WorkshopServiceSpy = jasmine.createSpyObj('WorkshopService', [
  'fileUpload',
  'register',
  'getWorkshop',
  'getWsList',
  'updateWorkshop',
  'delWorkshop',
  'subWorkshop',
  'getSub',
  'getSubList',
  'getSubName',
  'unsubWorkshop',
]);