import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { libStub } from 'src/test/lib.stub';
import { ActivatedRouteStub, LibAuthServiceSpy, LoggerSpy, TokenServiceSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { LibProfileComponent } from './lib-profile.component';

@Component({ selector: 'app-admin-header', template: '' })
class AdminHeaderComponent {
}

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

describe('LibProfileComponent', () => {
  let component: LibProfileComponent;
  let fixture: ComponentFixture<LibProfileComponent>;
  let getProfileSpy: jasmine.Spy;
  let getNameSpy: jasmine.Spy;

  beforeEach(async () => {
    getNameSpy = TokenServiceSpy.getUsername.and.returnValue(libStub().username);
    getProfileSpy = LibAuthServiceSpy.getProfile.and.returnValue(of(libStub()));
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: LibrarianAuthService,
          useValue: LibAuthServiceSpy,
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
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
        CommonService,
      ],
      declarations: [ 
        LibProfileComponent,
        AdminHeaderComponent,
        SiteFooterComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProfile service to get setting', ()=>{
    expect(getProfileSpy).toHaveBeenCalledWith(readerStub()._id);
  })
});
