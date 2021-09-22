import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BookService } from 'src/app/book/book.service';
import { CommonService } from 'src/app/common/common.service';
import { bookStub } from 'src/test/book.stub';
import { libStub } from 'src/test/lib.stub';
import { BookServiceSpy, LoggerSpy, TokenServiceSpy } from 'src/test/mock.service';

import { AdminPortalComponent } from './admin-portal.component';

@Component({ selector: 'app-admin-header', template: '' })
class AdminHeaderComponent {
}

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

@Component({ selector: 'app-inventory-summary', template: '' })
class InventorySummaryComponent {
  @Input() bookSummary;
}

@Component({ selector: 'app-reader-analysis', template: '' })
class ReaderAnalysisComponent {
  @Input() readerAnalysis;
}

@Component({ selector: 'app-book-list', template: '' })
class BookListComponent {
  @Input() bookList;
  @Input() role;
  @Input() listName;
}

describe('AdminPortalComponent', () => {
  let component: AdminPortalComponent;
  let fixture: ComponentFixture<AdminPortalComponent>;
  let getNameSpy: jasmine.Spy;
  let commonService: CommonService;
  let findHotListSpy: jasmine.Spy;
  let getSumSpy: jasmine.Spy;

  beforeEach(async () => {
    getNameSpy = TokenServiceSpy.getUsername.and.returnValue(`$A_${libStub().username}`);
    findHotListSpy = BookServiceSpy.findHotBooks.and.returnValue(of([bookStub()]));
    getSumSpy = BookServiceSpy.getInventorySum.and.returnValue(of([{category: 'Romance', count: 5}]));
    await TestBed.configureTestingModule({
      providers: [
        CommonService,
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
        {
          provide: BookService,
          useValue: BookServiceSpy,
        },
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        }
      ],
      declarations: [
        AdminPortalComponent,
        AdminHeaderComponent,
        SiteFooterComponent,
        InventorySummaryComponent,
        ReaderAnalysisComponent,
        BookListComponent,
      ]
    })
      .compileComponents();
    commonService = TestBed.inject(CommonService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPortalComponent);
    component = fixture.componentInstance;
    spyOn(commonService, 'setSubject');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsername service to set username in header', () => {
    expect(getNameSpy).toHaveBeenCalledWith();
    expect(commonService.setSubject).toHaveBeenCalledWith(libStub().username);
  })

  it('should call bookService to get inventory summary', ()=>{
    expect(getSumSpy).toHaveBeenCalledWith();
  })

  it('should call bookService to get topN book list', ()=>{
    expect(findHotListSpy).toHaveBeenCalledWith(10);
  })
});
