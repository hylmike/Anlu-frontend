import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { bookStub } from 'src/test/book.stub';
import { LoggerSpy, ReaderAuthServiceSpy, ReaderServiceSpy, RouterSpy, TokenServiceSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';
import { ReaderService } from '../reader.service';

import { FavorBookComponent } from './favor-book.component';

@Component({ selector: 'app-reader-header', template: '' })
class ReaderHeaderComponent {
}

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

describe('FavorBookComponent', () => {
  let component: FavorBookComponent;
  let fixture: ComponentFixture<FavorBookComponent>;
  let getFavorListSpy: jasmine.Spy;

  beforeEach(async () => {
    getFavorListSpy = ReaderServiceSpy.getFavorList.and.returnValue(of([bookStub()]));
    ReaderAuthServiceSpy.getReaderID.and.returnValue(readerStub()._id);
    await TestBed.configureTestingModule({
      providers: [
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
          provide: ReaderService,
          useValue: ReaderServiceSpy,
        },
        CommonService,
      ],
      declarations: [
        FavorBookComponent,
        ReaderHeaderComponent,
        SiteFooterComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ReaderService to get favorlist', () => {
    const listContainer = document.querySelector('div.favor-list');
    expect(getFavorListSpy).toHaveBeenCalledWith(readerStub()._id);
    expect(listContainer.childElementCount).toBeGreaterThanOrEqual(1);
  })
});
