import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { libStub } from 'src/test/lib.stub';
import { LibAuthServiceSpy, LoggerSpy, RouterSpy } from 'src/test/mock.service';

import { LibRegisterComponent } from './lib-register.component';

describe('LibRegisterComponent', () => {
  let component: LibRegisterComponent;
  let fixture: ComponentFixture<LibRegisterComponent>;
  let libRegSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    libRegSpy = LibAuthServiceSpy.register.and.returnValue(of(libStub()));
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
          provide: Router,
          useValue: RouterSpy,
        },
        FormBuilder,
      ],
      imports: [ReactiveFormsModule],
      declarations: [LibRegisterComponent]
    })
      .compileComponents();
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call libRegister service and redirect to login after that', () => {
    component.libRegisterForm.setValue({
      username: libStub().username,
      password: libStub().password,
      confirmPassword: libStub().password,
      email: libStub().email,
      role: libStub().role,
      firstName: libStub().firstName,
      lastName: libStub().lastName,
      phoneNumber: libStub().phoneNumber,
    });
    component.libRegister();
    fixture.detectChanges();
    expect(libRegSpy).toHaveBeenCalledWith(component.libRegisterForm.value);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/lib/account-manage');
  })
});
