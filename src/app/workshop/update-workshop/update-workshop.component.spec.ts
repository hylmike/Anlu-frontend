import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { LoggerSpy, WorkshopServiceSpy, ActivatedRouteStub, RouterSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';
import { workshopStub } from 'src/test/workshop.stub';
import { WorkshopService } from '../workshop.service';

import { UpdateWorkshopComponent } from './update-workshop.component';

describe('UpdateWorkshopComponent', () => {
  let component: UpdateWorkshopComponent;
  let fixture: ComponentFixture<UpdateWorkshopComponent>;
  let getWsSpy: jasmine.Spy;
  let updateWsSpy: jasmine.Spy;

  beforeEach(async () => {
    getWsSpy = WorkshopServiceSpy.getWorkshop.and.returnValue(of(workshopStub()));
    updateWsSpy = WorkshopServiceSpy.updateWorkshop.and.returnValue(of(workshopStub()));
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
          provide: ActivatedRoute,
          useValue: ActivatedRouteStub,
        },
        {
          provide: Router,
          useValue: RouterSpy,
        },
        FormBuilder,
        DatePipe,
      ],
      imports: [
        ReactiveFormsModule,
        MatProgressBarModule,
      ],
      declarations: [UpdateWorkshopComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call workshopService to get current profile', () => {
    expect(getWsSpy).toHaveBeenCalledWith(readerStub()._id);
  })

  it('should call workshopService to update profile', () => {
    component.wsUpdateForm.setValue({
      topic: workshopStub().topic,
      place: 'newPlace',
      organizer: workshopStub().organizer,
      startTime: '2021-10-08',
      duration: workshopStub().duration.toString(),
      poster: '',
      remark: workshopStub().remark,
    });
    component.wsUpdateForm.markAsDirty();
    component.updateWorkshop();
    fixture.autoDetectChanges();
    expect(updateWsSpy).toHaveBeenCalledWith(readerStub()._id, component.wsUpdateForm.value);
  })
});
