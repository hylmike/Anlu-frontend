import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { AdminAuthService } from 'src/app/auth/admin-auth.service';

import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { ActivatedRouteStub, AdminAuthServiceSpy, LoggerSpy, ReaderAuthServiceSpy, TokenServiceSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { ReaderProfileComponent } from './reader-profile.component';

@Component({ selector: 'app-reader-header', template: '' })
class ReaderHeaderComponent {
}

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

@Component({ selector: 'app-admin-header', template: '' })
class AdminHeaderComponent {
}

describe('ReaderProfileComponent', () => {
  let component: ReaderProfileComponent;
  let fixture: ComponentFixture<ReaderProfileComponent>;
  let getReaderSpy: jasmine.Spy;
  let commonService: CommonService;

  beforeEach(async () => {
    getReaderSpy = ReaderAuthServiceSpy.getReader.and.returnValue(of(readerStub()));
    TokenServiceSpy.getUsername.and.returnValue(readerStub().username);
    await TestBed.configureTestingModule({
      providers: [
        CommonService,
        {
          provide: ReaderAuthService,
          useValue: ReaderAuthServiceSpy,
        },
        {
          provide: AdminAuthService,
          useValue: AdminAuthServiceSpy,
        },
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteStub,
        }
      ],
      declarations: [
        ReaderProfileComponent,
        ReaderHeaderComponent,
        SiteFooterComponent,
        AdminHeaderComponent,
      ]
    })
      .compileComponents();
    commonService = TestBed.inject(CommonService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ReaderAuthService.getReader', () => {
    expect(getReaderSpy).toHaveBeenCalledWith(readerStub()._id);
  })

  it('should set subject to reader username', ()=>{
    commonService.usernameUpdate.subscribe((data)=>{
      expect(data).toEqual(readerStub().username);
    })
  })
});
