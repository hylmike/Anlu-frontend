import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { libStub } from 'src/test/lib.stub';
import { LibAuthServiceSpy, LoggerSpy, RouterSpy, TokenServiceSpy } from 'src/test/mock.service';

import { LibrarianHeaderComponent } from './librarian-header.component';

describe('LibrarianHeaderComponent', () => {
  let component: LibrarianHeaderComponent;
  let fixture: ComponentFixture<LibrarianHeaderComponent>;
  let commonService: CommonService;
  let libLogoutSpy: jasmine.Spy;

  beforeEach(async () => {
    LibAuthServiceSpy.getLibID.and.returnValue(libStub()._id);
    libLogoutSpy = LibAuthServiceSpy.signOut.and.returnValue(of(libStub()._id));
    await TestBed.configureTestingModule({
      providers: [
        CommonService,
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
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
          provide: Router,
          useValue: RouterSpy,
        },
        FormBuilder,
      ],
      imports: [ReactiveFormsModule],
      declarations: [LibrarianHeaderComponent]
    })
      .compileComponents();
    commonService = TestBed.inject(CommonService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianHeaderComponent);
    component = fixture.componentInstance;
    commonService.setSubject(libStub().username);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call tokenService to set username', () => {
    const welcomeLabel = document.querySelector('label.label_welcome');
    expect(welcomeLabel.innerHTML).toEqual(`Welcome! ${libStub().username}`);
  })

  it('should call libAuthService signOut if click logout menu', () => {
    const logoutLink = document.querySelector('a.logout') as HTMLAnchorElement;
    logoutLink.click();
    fixture.detectChanges();
    expect(libLogoutSpy).toHaveBeenCalledWith();
  })
});
