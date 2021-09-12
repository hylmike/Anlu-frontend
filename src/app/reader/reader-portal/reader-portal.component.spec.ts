import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { BookService } from 'src/app/book/book.service';
import { bookStub } from 'src/test/book.stub';
import { libStub } from 'src/test/lib.stub';
import { BookServiceSpy, LibAuthServiceSpy, LoggerSpy, ReaderAuthServiceSpy, RouterSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { ReaderPortalComponent } from './reader-portal.component';

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

describe('ReaderPortalComponent', () => {
  let component: ReaderPortalComponent;
  let fixture: ComponentFixture<ReaderPortalComponent>;
  let readerLoginSpy: jasmine.Spy;
  let getReaderSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;
  let findHotListSpy: jasmine.Spy;

  beforeEach(async () => {
    getReaderSpy = ReaderAuthServiceSpy.getReaderID.and.returnValue(readerStub()._id);
    readerLoginSpy = ReaderAuthServiceSpy.isLoggedIn.and.returnValue(true);
    LibAuthServiceSpy.isLoggedIn.and.returnValue(false);
    LibAuthServiceSpy.signOut.and.returnValue(libStub()._id);
    findHotListSpy = BookServiceSpy.findHotBooks.and.returnValue(of([bookStub()]))
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ReaderAuthService,
          useValue: ReaderAuthServiceSpy,
        },
        {
          provide: LibrarianAuthService,
          useValue: LibAuthServiceSpy,
        },
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        },
        {
          provide: BookService,
          useValue: BookServiceSpy,
        },
        {
          provide: Router,
          useValue: RouterSpy,
        },
      ],
      declarations: [
        ReaderPortalComponent,
        ReaderHeaderComponent,
        SiteFooterComponent,
        BookListComponent,
        LibEventsComponent,
      ]
    })
      .compileComponents();
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to signed portal if reader already login before', () => {
    expect(getReaderSpy).toHaveBeenCalled;
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/reader/signed/${readerStub()._id}`);
  });

  it('should call BookServie to find hotbook list', () => {
    expect(findHotListSpy).toHaveBeenCalledWith(6);
  })
});
