import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { libList, libStub } from 'src/test/lib.stub';
import { LibAuthServiceSpy, LoggerSpy, TokenServiceSpy } from 'src/test/mock.service';

import { AccountManageComponent } from './account-manage.component';

fdescribe('AccountManageComponent', () => {
  let component: AccountManageComponent;
  let fixture: ComponentFixture<AccountManageComponent>;
  let getAllAdminSpy: jasmine.Spy;
  let getAllLibSpy: jasmine.Spy;
  let deleteLibSpy: jasmine.Spy;

  beforeEach(async () => {
    TokenServiceSpy.getUsername.and.returnValue(libStub().username);
    getAllAdminSpy = LibAuthServiceSpy.getAllAdmin.and.returnValue(of(libList));
    getAllLibSpy = LibAuthServiceSpy.getAllLib.and.returnValue(of(libList));
    deleteLibSpy = LibAuthServiceSpy.deleteLib.and.returnValue(of(libStub()._id));
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
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        }
      ],
      declarations: [AccountManageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should call LibAuthService.getAllAdmin and .getAllLib to generate list', () => {
    const adminDiv = fixture.nativeElement.querySelector('div.admin-block');
    const libDiv = fixture.nativeElement.querySelector('div.lib-block');
    expect(getAllAdminSpy).toHaveBeenCalled;
    expect(adminDiv.childElementCount).toBeGreaterThan(1);
    expect(getAllLibSpy).toHaveBeenCalled;
    expect(libDiv.childElementCount).toBeGreaterThan(1);
  })

  fit('should call LibAuthService.deleteLib when click delete link', () => {
    const deleteLink = fixture.nativeElement.querySelector('a.delete-link') as HTMLAnchorElement;
    spyOn(window, 'confirm').and.returnValue(false);
    deleteLink.click();
    fixture.detectChanges();
    expect(window.confirm).toHaveBeenCalledWith('Do you relly want to delete this account?');
  })
});
