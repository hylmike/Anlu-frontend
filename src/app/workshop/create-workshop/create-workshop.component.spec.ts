import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { libStub } from 'src/test/lib.stub';
import { LoggerSpy, RouterSpy, TokenServiceSpy, WorkshopServiceSpy } from 'src/test/mock.service';
import { workshopStub } from 'src/test/workshop.stub';
import { WorkshopService } from '../workshop.service';

import { CreateWorkshopComponent } from './create-workshop.component';

describe('CreateWorkshopComponent', () => {
  let component: CreateWorkshopComponent;
  let fixture: ComponentFixture<CreateWorkshopComponent>;
  let regWsSpy: jasmine.Spy;

  beforeEach(async () => {
    TokenServiceSpy.getUsername.and.returnValue(`$L_${libStub().username}`);
    regWsSpy = WorkshopServiceSpy.register.and.returnValue(of(workshopStub()));
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        },
        {
          provide: WorkshopService,
          useValue: WorkshopServiceSpy,
        },
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
        {
          provide: Router,
          useValue: RouterSpy,
        },
        FormBuilder,
      ],
      imports: [
        ReactiveFormsModule,
        MatProgressBarModule,
      ],
      declarations: [CreateWorkshopComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkshopComponent);
    component = fixture.componentInstance;
    component.reloadPage = function() {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call workshopService to register new workshop', () => {
    component.posterUploadUrl = workshopStub().poster;
    component.workshopRegForm.setValue({
      topic: workshopStub().topic,
      place: workshopStub().place,
      organizer: workshopStub().organizer,
      startTime: workshopStub().startTime.toString(),
      duration: workshopStub().duration.toString(),
      poster: '',
      creator: libStub().username,
      remark: workshopStub().remark,
    });
    component.workshopRegister();
    fixture.autoDetectChanges();
    expect(regWsSpy).toHaveBeenCalledWith(component.workshopRegForm.value);
  })
});
