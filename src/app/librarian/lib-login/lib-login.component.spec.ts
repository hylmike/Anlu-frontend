import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AdminAuthService } from 'src/app/auth/admin-auth.service';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { AdminAuthServiceSpy, LibAuthServiceSpy, LoggerSpy, RouterSpy, TokenServiceSpy } from 'src/test/mock.service';
import { accessTokenStub, libStub } from 'src/test/lib.stub';

import { LibLoginComponent } from './lib-login.component';
import { of } from 'rxjs';

describe('LibrarianLoginComponent', () => {
  let component: LibLoginComponent;
  let fixture: ComponentFixture<LibLoginComponent>;
  let libLoginSpy: jasmine.Spy;
  let adminLoginSpy: jasmine.Spy;

  beforeEach(async () => {
    libLoginSpy = LibAuthServiceSpy.signIn.and.returnValue(of(accessTokenStub()));
    adminLoginSpy = AdminAuthServiceSpy.signIn.and.returnValue(of(accessTokenStub()));
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: LibrarianAuthService,
          useValue: LibAuthServiceSpy,
        },
        {
          provide: AdminAuthService,
          useValue: AdminAuthServiceSpy,
        },
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        },
        {
          provide: Router,
          useValue: RouterSpy,
        },
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
        CommonService,
        FormBuilder,
      ],
      imports: [ReactiveFormsModule],
      declarations: [LibLoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call lib signIn service when login as lib', () => {
    component.libLoginForm.setValue({
      username: libStub().username,
      password: libStub().password,
      role: 'Librarian',
    });
    component.libLogin();
    fixture.detectChanges();
    expect(libLoginSpy).toHaveBeenCalledWith(libStub().username, libStub().password);
  })

  it('should call admin signIn service when login as admin', () => {
    component.libLoginForm.setValue({
      username: libStub().username,
      password: libStub().password,
      role: 'Admin',
    });
    component.libLogin();
    fixture.detectChanges();
    expect(adminLoginSpy).toHaveBeenCalledWith(libStub().username, libStub().password);
  })
});
