import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { LoggerSpy, ReaderAuthServiceSpy, RouterSpy, TokenServiceSpy } from 'src/test/mock.service';
import { accessTokenStub, readerStub } from 'src/test/reader.stub';

import { ReaderLoginComponent } from './reader-login.component';

describe('LoginComponent', () => {
  let component: ReaderLoginComponent;
  let fixture: ComponentFixture<ReaderLoginComponent>;
  let signInSpy: jasmine.Spy;
  let getReaderIDSpy: jasmine.Spy;
  let tokenService: jasmine.SpyObj<TokenStorageService>;
  let commonService: CommonService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    signInSpy = ReaderAuthServiceSpy.signIn.and.returnValue(of(accessTokenStub()));
    getReaderIDSpy = ReaderAuthServiceSpy.getReaderID.and.returnValue(readerStub()._id);
    ReaderAuthServiceSpy.redirectUrl = '';
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: RouterSpy,
        },
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
        FormBuilder,
        CommonService,
      ],
      imports: [ReactiveFormsModule],
      declarations: [ReaderLoginComponent]
    })
      .compileComponents();
    tokenService = TestBed.inject(TokenStorageService) as jasmine.SpyObj<TokenStorageService>;
    commonService = TestBed.inject(CommonService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderLoginComponent);
    component = fixture.componentInstance;
    component.readerLoginForm.setValue({
      username: 'username',
      password: 'password',
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ReaderAuthService.signIn when click submit button', () => {
    const submitButton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    submitButton.click();
    fixture.detectChanges;
    expect(signInSpy).toHaveBeenCalledWith('username', 'password');
  })

  it('should call TokenStorageService.saveToken and CommonService when login', () => {
    component.readerLogin();
    fixture.detectChanges;
    expect(tokenService.saveToken).toHaveBeenCalledWith(accessTokenStub(), 'username');
    commonService.usernameUpdate.subscribe((data) => {
      expect(data).toEqual('username');
    })
  })

  it('should redirect to reader signed portal page', () => {
    component.readerLogin();
    fixture.detectChanges;
    expect(router.navigateByUrl).toHaveBeenCalledWith(`/reader/signed/${readerStub()._id}`);
  })
});
