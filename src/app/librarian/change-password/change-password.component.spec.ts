import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { libStub } from 'src/test/lib.stub';
import { ActivatedRouteStub, LibAuthServiceSpy, LoggerSpy, RouterSpy } from 'src/test/mock.service';

import { ChangePwdComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePwdComponent;
  let fixture: ComponentFixture<ChangePwdComponent>;
  let getProfileSpy: jasmine.Spy;
  let changePwdSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    getProfileSpy = LibAuthServiceSpy.getProfile.and.returnValue(of(libStub()));
    changePwdSpy = LibAuthServiceSpy.changePwd.and.returnValue(of(libStub().username));
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: LibrarianAuthService,
          useValue: LibAuthServiceSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteStub,
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
      declarations: [ChangePwdComponent]
    })
      .compileComponents();
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(getProfileSpy).toHaveBeenCalled;
  });

  it('should call changePwd service to change password and redirect back to profile page', () => {
    component.changePwdForm.setValue({
      username: libStub().username,
      currentPassword: libStub().password,
      newPassword: 'newpass123',
      confirmPassword: 'newpass123',
    });
    component.changePwd();
    fixture.detectChanges();
    expect(changePwdSpy).toHaveBeenCalledWith(component.changePwdForm.value);
    expect(routerSpy.navigateByUrl).toHaveBeenCalled;
  })

  it('should redirect back to lib profile page if cancel', () => {
    component.cancel();
    fixture.detectChanges();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(2);
  })
});
