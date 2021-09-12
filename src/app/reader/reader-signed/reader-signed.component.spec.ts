import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BookService } from 'src/app/book/book.service';
import { CommonService } from 'src/app/common/common.service';
import { bookStub } from 'src/test/book.stub';
import {
  ActivatedRouteStub,
  BookServiceSpy,
  LoggerSpy,
  ReaderAuthServiceSpy,
  ReaderServiceSpy,
  RouterSpy,
  TokenServiceSpy,
} from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';
import { ReaderService } from '../reader.service';

import { ReaderSignedComponent } from './reader-signed.component';

@Component({ selector: 'app-reader-header', template: '' })
class ReaderHeaderComponent {
}

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

@Component({ selector: 'app-lib-events', template: '' })
class LibEventsComponent {
}

@Component({ selector: 'app-book-list', template: '' })
class BookListComponent {
  @Input() bookList;
  @Input() role;
  @Input() listName;
}

describe('ReaderSignedComponent', () => {
  let component: ReaderSignedComponent;
  let fixture: ComponentFixture<ReaderSignedComponent>;
  let getReadBooksSpy: jasmine.Spy;
  let getFavorListSpy: jasmine.Spy;
  let findHotListSpy: jasmine.Spy;
  let getReaderIDSpy: jasmine.Spy;
  let getUsernameSpy: jasmine.Spy;
  let commonService: CommonService;

  beforeEach(async () => {
    getReaderIDSpy = ReaderAuthServiceSpy.getReaderID.and.returnValue(readerStub()._id);
    getReadBooksSpy = ReaderServiceSpy.getReadBooks.and.returnValue(of([bookStub()]));
    getFavorListSpy = ReaderServiceSpy.getFavorList.and.returnValue(of([bookStub()]));
    findHotListSpy = BookServiceSpy.findHotBooks.and.returnValue(of([bookStub()]));
    getUsernameSpy = TokenServiceSpy.getUsername.and.returnValue(readerStub().username);

    await TestBed.configureTestingModule({
      providers: [
        CommonService,
        {
          provide: ReaderAuthService,
          useValue: ReaderAuthServiceSpy,
        },
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteStub,
        },
        {
          provide: ReaderService,
          useValue: ReaderServiceSpy,
        },
        {
          provide: BookService,
          useValue: BookServiceSpy,
        },
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
        {
          provide: Router,
          useValue: RouterSpy,
        },
      ],
      declarations: [
        ReaderSignedComponent,
        ReaderHeaderComponent,
        SiteFooterComponent,
        LibEventsComponent,
        BookListComponent,
      ]
    })
      .compileComponents();
    commonService = TestBed.inject(CommonService) as jasmine.SpyObj<CommonService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderSignedComponent);
    component = fixture.componentInstance;
    spyOn(commonService, 'setSubject');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ReaderAuthService to get username and set in header', () => {
    expect(getUsernameSpy).toHaveBeenCalled;
    expect(commonService.setSubject).toHaveBeenCalledWith(readerStub().username);
  })

  it('should call ReaderService and BookService to get read/favor/hot book list', () => {
    expect(getReadBooksSpy).toHaveBeenCalledWith(readerStub()._id);
    expect(getFavorListSpy).toHaveBeenCalledWith(readerStub()._id);
    expect(findHotListSpy).toHaveBeenCalledWith(6);
  })
});
