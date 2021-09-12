import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { ReaderAuthServiceSpy, RouterSpy, TokenServiceSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { ReaderLogoutComponent } from './reader-logout.component';

describe('LogoutComponent', () => {
  let component: ReaderLogoutComponent;
  let fixture: ComponentFixture<ReaderLogoutComponent>;
  let readerLogoutSpy: jasmine.Spy;
  let clearTokenSpy: jasmine.Spy;
  let commonService: CommonService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    readerLogoutSpy = ReaderAuthServiceSpy.signOut.and.returnValue(of(readerStub()._id));
    clearTokenSpy = TokenServiceSpy.clearToken.and.returnValue(null);
    await TestBed.configureTestingModule({
      providers: [
        CommonService,
        {
          provide: ReaderAuthService,
          useValue: ReaderAuthServiceSpy,
        },
        {
          provide: Router,
          useValue: RouterSpy,
        },
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
      ],
      declarations: [ReaderLogoutComponent]
    })
      .compileComponents();
    commonService = TestBed.inject(CommonService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderLogoutComponent);
    component = fixture.componentInstance;
    spyOn(commonService, 'setSubject');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ReaderAuthService to clear backend info', () => {
    expect(readerLogoutSpy).toHaveBeenCalledWith();
  })

  it('should clear token info in local storage and update webpage', () => {
    expect(clearTokenSpy).toHaveBeenCalled;
    expect(commonService.setSubject).toHaveBeenCalledWith('Our Guest');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/reader');
  })
});
