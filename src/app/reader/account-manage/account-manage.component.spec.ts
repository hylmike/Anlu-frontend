import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { libStub } from 'src/test/lib.stub';
import { LoggerSpy, ReaderAuthServiceSpy, RouterSpy, TokenServiceSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { AccountManageComponent } from './account-manage.component';

@Component({ selector: 'app-admin-header', template: '' })
class AdminHeaderComponent {
}

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

describe('AccountManageComponent', () => {
  let component: AccountManageComponent;
  let fixture: ComponentFixture<AccountManageComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let getAllReaderSpy: jasmine.Spy;
  let deaReaderSpy: jasmine.Spy;
  let delReaderSpy: jasmine.Spy;

  beforeEach(async () => {
    TokenServiceSpy.getUsername.and.returnValue(libStub().username);
    getAllReaderSpy = ReaderAuthServiceSpy.getAllReader.and.returnValue(of([readerStub()]));
    deaReaderSpy = ReaderAuthServiceSpy.deaReader.and.returnValue(of(false));
    ReaderAuthServiceSpy.actReader.and.returnValue(of(true));
    delReaderSpy = ReaderAuthServiceSpy.delReader.and.returnValue(of(readerStub()._id));
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
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
        {
          provide: Router,
          useValue: RouterSpy,
        },
      ],
      imports: [NgxPaginationModule],
      declarations: [
        AccountManageComponent,
        AdminHeaderComponent,
        SiteFooterComponent,
      ]
    })
      .compileComponents();
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManageComponent);
    component = fixture.componentInstance;
    component.reloadPage = function() {}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ReaderAuthService to get and render all reader list', () => {
    const readerBlock = document.querySelector('div.reader-block');
    expect(getAllReaderSpy).toHaveBeenCalledWith();
    expect(readerBlock.childElementCount).toBeGreaterThanOrEqual(3);
  });

  it('should redirect to profile page when click review button', () => {
    const reviewLink = document.querySelector('button.review-link') as HTMLButtonElement;
    reviewLink.click();
    fixture.detectChanges();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/reader/mprofile/${readerStub()._id}`);
  });

  it('should call deaReader() when click Deactivate button', () => {
    const deaLink = document.querySelector('button.dea-link') as HTMLButtonElement;
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert').and.returnValue();
    deaLink.click();
    fixture.detectChanges();
    expect(deaReaderSpy).toHaveBeenCalledWith(readerStub()._id);
  });

  it('should call delReader() when click Delete button', () => {
    const delLink = document.querySelector('button.del-link') as HTMLButtonElement;
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert').and.returnValue();
    delLink.click();
    fixture.detectChanges();
    expect(delReaderSpy).toHaveBeenCalledWith(readerStub()._id);
  });
});
