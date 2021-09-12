import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { LoggerSpy, ReaderAuthServiceSpy, RouterSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { ReaderUpdateComponent } from './reader-update.component';

describe('UpdateComponent', () => {
  let component: ReaderUpdateComponent;
  let fixture: ComponentFixture<ReaderUpdateComponent>;
  let updateProfileSpy: jasmine.Spy;
  let getReaderSpy: jasmine.Spy;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    getReaderSpy = ReaderAuthServiceSpy.getReader.and.returnValue(of(readerStub()));
    updateProfileSpy = ReaderAuthServiceSpy.updateProfile.and.returnValue(of(readerStub()._id));
    await TestBed.configureTestingModule({
      providers: [
        FormBuilder,
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
        DatePipe,
      ],
      declarations: [ReaderUpdateComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call ReaderAuthService.getReader`, () => {
    expect(getReaderSpy).toHaveBeenCalled;
  })

  it('should call ReaderAuthService.updateProfile when submit the form', () => {
    component.updateForm.markAsDirty();
    component.updateForm.setValue({
      username: readerStub().username,
      email: 'email@email',
      firstName: '',
      lastName: '',
      gender: '',
      birthday: '',
      phoneNumber: '',
      homeAddress: 'homeAddress',
      province: '',
      postcode: '',
      securityQuestion: '',
      securityAnswer: '',
    });
    component.update();
    fixture.detectChanges();
    expect(updateProfileSpy).toHaveBeenCalledWith(component.updateForm.value);
  })

  it('should redirect to reader profile page after success update', () => {
    component.updateForm.markAsDirty();
    component.update();
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith(`/reader/profile/${readerStub()._id}`);
  })
});
