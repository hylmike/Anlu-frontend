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

import { AdminHeaderComponent } from './admin-header.component';

describe('AdminHeaderComponent', () => {
  let component: AdminHeaderComponent;
  let fixture: ComponentFixture<AdminHeaderComponent>;
  let libLogoutSpy: jasmine.Spy;
  let commonService: CommonService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    libLogoutSpy = LibAuthServiceSpy.signOut.and.returnValue(of(libStub()._id));
    LibAuthServiceSpy.getLibID.and.returnValue(libStub()._id);
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
      declarations: [AdminHeaderComponent]
    })
      .compileComponents();
    commonService = TestBed.inject(CommonService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeaderComponent);
    component = fixture.componentInstance;
    commonService.setSubject(libStub().username);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call commonService to set username in header', () => {
    const welcomeLabel = document.querySelector('label.label_welcome');
    expect(welcomeLabel.innerHTML).toEqual(`Welcome! ${libStub().username}`);
  })

  it('should call libAuthService to logout', () => {
    component.logout();
    fixture.detectChanges();
    expect(libLogoutSpy).toHaveBeenCalledWith();
  })

  it('should redirect to search page if click search bar', () => {
    component.searchForm.setValue({ searchValue: 'testBook' });
    component.searchBook();
    fixture.detectChanges();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/book/admin/search?sval=testBook');
  })
});
