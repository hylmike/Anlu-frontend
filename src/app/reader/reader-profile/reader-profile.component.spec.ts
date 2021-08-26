import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';

import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { CommonService } from 'src/app/common/common.service';
import { ActivatedRouteStub, LoggerSpy, ReaderAuthServiceSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { ReaderProfileComponent } from './reader-profile.component';

@Component({ selector: 'app-reader-header', template: '' })
class ReaderHeaderComponent {
}

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

describe('ReaderProfileComponent', () => {
  let component: ReaderProfileComponent;
  let fixture: ComponentFixture<ReaderProfileComponent>;
  let getReaderSpy: jasmine.Spy;
  let commonService: CommonService;

  beforeEach(async () => {
    getReaderSpy = ReaderAuthServiceSpy.getReader.and.returnValue(of(readerStub()));
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
        }
      ],
      declarations: [
        ReaderProfileComponent,
        ReaderHeaderComponent,
        SiteFooterComponent,
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
