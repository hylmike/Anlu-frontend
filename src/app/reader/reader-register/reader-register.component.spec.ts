import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { LoggerSpy, ReaderAuthServiceSpy, RouterSpy } from 'src/test/mock.service';
import { ReaderRegisterComponent } from './reader-register.component';
import { readerStub } from 'src/test/reader.stub';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let regComponent: ReaderRegisterComponent;
  let fixture: ComponentFixture<ReaderRegisterComponent>;
  let registerSpy: jasmine.Spy;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    registerSpy = ReaderAuthServiceSpy.register.and.returnValue(of(readerStub()));

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ReaderAuthService,
          useValue: ReaderAuthServiceSpy,
        },
        {
          provide: Router,
          useValue: RouterSpy,
        },
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        },
        FormBuilder,
      ],
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [ReaderRegisterComponent]
    })
      .compileComponents();
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderRegisterComponent);
    regComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(regComponent).toBeTruthy();
  });

  it('submit with empty form should not call register', () => {
    const submitButton = fixture.nativeElement.querySelector('input.btnRegister') as HTMLButtonElement;
    spyOn(regComponent, 'register');
    submitButton.click();
    fixture.detectChanges();
    expect(regComponent.register).not.toHaveBeenCalled();
  })

  it('should call ReaderAuthService.register with valid form data when submit', () => {
    regComponent.registerForm.setValue({
      username: readerStub().username,
      password: readerStub().password,
      confirmPassword: readerStub().password,
      email: readerStub().email,
      firstName: readerStub().readerProfile.firstName,
      lastName: readerStub().readerProfile.lastName,
      gender: readerStub().readerProfile.gender,
      birthday: readerStub().readerProfile.birthday.toString(),
      phoneNumber: readerStub().readerProfile.phoneNumber,
      homeAddress: readerStub().readerProfile.address.homeAddress,
      province: readerStub().readerProfile.address.province,
      postcode: readerStub().readerProfile.address.postcode,
      securityQuestion: readerStub().readerProfile.securityQuestion,
      securityAnswer: readerStub().readerProfile.securityAnswer,
    });
    regComponent.register();
    fixture.detectChanges;
    expect(registerSpy).toHaveBeenCalledWith(regComponent.registerForm.value);
  })

  it('should redirect to login after success registration', () => {
    regComponent.registerForm.setValue({
      username: readerStub().username,
      password: readerStub().password,
      confirmPassword: readerStub().password,
      email: readerStub().email,
      firstName: readerStub().readerProfile.firstName,
      lastName: readerStub().readerProfile.lastName,
      gender: readerStub().readerProfile.gender,
      birthday: readerStub().readerProfile.birthday.toString(),
      phoneNumber: readerStub().readerProfile.phoneNumber,
      homeAddress: readerStub().readerProfile.address.homeAddress,
      province: readerStub().readerProfile.address.province,
      postcode: readerStub().readerProfile.address.postcode,
      securityQuestion: readerStub().readerProfile.securityQuestion,
      securityAnswer: readerStub().readerProfile.securityAnswer,
    });
    regComponent.register();
    fixture.detectChanges;
    expect(router.navigateByUrl).toHaveBeenCalledWith('/reader/login');
  })
});
