import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { libStub } from 'src/test/lib.stub';
import { ActivatedRouteStub, LibAuthServiceSpy, LoggerSpy, RouterSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { LibUpdateComponent } from './lib-update.component';

describe('LibUpdateComponent', () => {
  let component: LibUpdateComponent;
  let fixture: ComponentFixture<LibUpdateComponent>;
  let getSpy: jasmine.Spy;
  let updateSpy: jasmine.Spy;
  let routeSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    getSpy = LibAuthServiceSpy.getProfile.and.returnValue(of(libStub()));
    updateSpy = LibAuthServiceSpy.updateProfile.and.returnValue(of(libStub()._id));
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
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteStub,
        },
        FormBuilder,
      ],
      imports: [ ReactiveFormsModule ],
      declarations: [ LibUpdateComponent ]
    })
    .compileComponents();
    routeSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProfile to get current setting', ()=>{
    expect(getSpy).toHaveBeenCalledWith(readerStub()._id);
  })

  it('should call updateProfile to update setting', ()=>{
    component.libUpdateForm.markAsDirty();
    component.libUpdateForm.setValue({
      username: libStub().username,
          email: 'email@email',
          role: '',
          firstName: '',
          lastName: '',
          phoneNumber: '1111111111',
          isActive: '',
    })
    component.updateLib();
    fixture.detectChanges();
    expect(updateSpy).toHaveBeenCalledWith(component.libUpdateForm.value);
    expect(routeSpy.navigateByUrl).toHaveBeenCalledWith(`/lib/profile/${readerStub()._id}`);
  })
});
