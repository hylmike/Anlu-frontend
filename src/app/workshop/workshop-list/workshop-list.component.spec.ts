import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of, Subscriber } from 'rxjs';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { LoggerSpy, ReaderAuthServiceSpy, RouterSpy, TokenServiceSpy, WorkshopServiceSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';
import { subscriberStub, workshopStub } from 'src/test/workshop.stub';
import { WorkshopService } from '../workshop.service';

import { WorkshopListComponent } from './workshop-list.component';

describe('WorkshopListComponent', () => {
  let component: WorkshopListComponent;
  let fixture: ComponentFixture<WorkshopListComponent>;
  let getWsListSpy: jasmine.Spy;
  let subWsSpy: jasmine.Spy;
  let unsubWsSpy: jasmine.Spy;
  let delWsSpy: jasmine.Spy;
  let getSubSpy: jasmine.Spy;
  let getSubListSpy: jasmine.Spy;

  beforeEach(async () => {
    TokenServiceSpy.getUsername.and.returnValue(readerStub().username);
    getWsListSpy = WorkshopServiceSpy.getWsList.and.returnValue(of([workshopStub()]));
    ReaderAuthServiceSpy.getReaderID.and.returnValue(readerStub()._id);
    subWsSpy = WorkshopServiceSpy.subWorkshop.and.returnValue(of(subscriberStub()));
    unsubWsSpy = WorkshopServiceSpy.unsubWorkshop.and.returnValue(of(subscriberStub()._id));
    delWsSpy = WorkshopServiceSpy.delWorkshop.and.returnValue(of(workshopStub()._id));
    getSubSpy = WorkshopServiceSpy.getSub.and.returnValue(of(subscriberStub()));
    getSubListSpy = WorkshopServiceSpy.getSubList.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        },
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
        {
          provide: ReaderAuthService,
          useValue: ReaderAuthServiceSpy,
        },
        {
          provide: WorkshopService,
          useValue: WorkshopServiceSpy,
        },
        {
          provide: Router,
          useValue: RouterSpy,
        },
      ],
      declarations: [WorkshopListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopListComponent);
    component = fixture.componentInstance;
    component.reloadPage = function() {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call workshopService to get workshop list', () => {
    expect(getWsListSpy).toHaveBeenCalledWith(0);
  })

  it('should call workshopService to subscribe workshop', () => {
    component.subWorkshop(workshopStub()._id);
    fixture.autoDetectChanges();
    expect(subWsSpy).toHaveBeenCalledWith({ workshop: workshopStub()._id, readerID: readerStub()._id });
  })

  it('should call workshopService to unsubscribe workshop', () => {
    component.unsubWorkshop(workshopStub()._id);
    fixture.autoDetectChanges();
    expect(unsubWsSpy).toHaveBeenCalledWith( workshopStub()._id, {subID: subscriberStub()._id });
  })

  it('should call workshopService to delete the workshop', ()=>{
    spyOn(window, 'confirm').and.returnValue(true);
    component.delWorkshop(workshopStub()._id);
    fixture.autoDetectChanges();
    expect(delWsSpy).toHaveBeenCalledWith(workshopStub()._id);
  })
});
