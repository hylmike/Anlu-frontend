import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { libStub } from 'src/test/lib.stub';
import { ActivatedRouteStub, LoggerSpy, TokenServiceSpy, WorkshopServiceSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';
import { workshopStub } from 'src/test/workshop.stub';
import { WorkshopService } from '../workshop.service';

import { WorkshopInfoComponent } from './workshop-info.component';

@Component({ selector: 'app-librarian-header', template: '' })
class LibrarianHeaderComponent {
}

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

describe('WorkshopInfoComponent', () => {
  let component: WorkshopInfoComponent;
  let fixture: ComponentFixture<WorkshopInfoComponent>;
  let getWsSpy: jasmine.Spy;
  let getSubNameSpy: jasmine.Spy;

  beforeEach(async () => {
    TokenServiceSpy.getUsername.and.returnValue(`$L_${libStub().username}`);
    getWsSpy = WorkshopServiceSpy.getWorkshop.and.returnValue(of(workshopStub()));
    getSubNameSpy = WorkshopServiceSpy.getSubName.and.returnValue(of(readerStub().username));
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
          provide: WorkshopService,
          useValue: WorkshopServiceSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteStub,
        },
        CommonService,
      ],
      declarations: [ 
        WorkshopInfoComponent,
        LibrarianHeaderComponent,
        SiteFooterComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call workshopServie to get workshop and translate sub name', ()=>{
    expect(getWsSpy).toHaveBeenCalledWith(readerStub()._id);
    expect(getSubNameSpy).toHaveBeenCalled;
  })
});
