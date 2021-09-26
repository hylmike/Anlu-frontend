import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { ReaderHeaderComponent } from 'src/app/reader/reader-header/reader-header.component';
import { ReaderAuthServiceSpy, RouterSpy, TokenServiceSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { WorkshopPortalComponent } from './workshop-portal.component';

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

@Component({ selector: 'app-workshop-list', template: '' })
class WorkshopListComponent {
}

describe('WorkshopPortalComponent', () => {
  let component: WorkshopPortalComponent;
  let fixture: ComponentFixture<WorkshopPortalComponent>;
  let commonService: CommonService;

  beforeEach(async () => {
    TokenServiceSpy.getUsername.and.returnValue(readerStub().username);
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
        CommonService,
        FormBuilder,
        {
          provide: ReaderAuthService,
          useValue: ReaderAuthServiceSpy,
        },
        {
          provide: Router,
          useValue: RouterSpy,
        },
      ],
      imports: [ReactiveFormsModule],
      declarations: [ 
        WorkshopPortalComponent,
        ReaderHeaderComponent,
        SiteFooterComponent,
        WorkshopListComponent,
      ]
    })
    .compileComponents();
    commonService = TestBed.inject(CommonService);
  });

  beforeEach(() => {
    spyOn(commonService, 'setSubject');
    fixture = TestBed.createComponent(WorkshopPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call commonService to set username in header', ()=>{
    expect(commonService.setSubject).toHaveBeenCalledWith(readerStub().username);
  })
});
