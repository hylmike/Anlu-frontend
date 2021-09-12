import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { LoggerSpy, ReaderAuthServiceSpy, RouterSpy, TokenServiceSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { ReaderChangePwdComponent } from './reader-change-pwd.component';

describe('ReaderChangePwdComponent', () => {
  let component: ReaderChangePwdComponent;
  let fixture: ComponentFixture<ReaderChangePwdComponent>;
  let changePwdSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    changePwdSpy = ReaderAuthServiceSpy.changePwd.and.returnValue(of(readerStub().username));
    ReaderAuthServiceSpy.getReaderID.and.returnValue(readerStub()._id);
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ReaderAuthService,
          useValue: ReaderAuthServiceSpy,
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
          provide: Router,
          useValue: RouterSpy,
        },
        FormBuilder,
      ],
      imports: [ReactiveFormsModule],
      declarations: [ReaderChangePwdComponent]
    })
      .compileComponents();
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ReaderAuthService to change password and then redirect to login', () => {
    component.changePwdForm.setValue({
      username: readerStub().username,
      currentPassword: readerStub().password,
      newPassword: 'newPass',
      confirmPassword: 'newPass',
    });
    component.changePwd();
    fixture.detectChanges();
    expect(changePwdSpy).toHaveBeenCalledWith(component.changePwdForm.value);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('reader/login');
  })

  it('should go back to profile page when cancelled', () => {
    component.cancel();
    fixture.detectChanges();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`reader/profile/${readerStub()._id}`);
  })
});
