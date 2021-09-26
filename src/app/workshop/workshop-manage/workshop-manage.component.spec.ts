import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { libStub } from 'src/test/lib.stub';
import { TokenServiceSpy } from 'src/test/mock.service';

import { WorkshopManageComponent } from './workshop-manage.component';

@Component({ selector: 'app-librarian-header', template: '' })
class LibrarianHeaderComponent {
}

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

@Component({ selector: 'app-workshop-list', template: '' })
class WorkshopListComponent {
}

describe('WorkshopManageComponent', () => {
  let component: WorkshopManageComponent;
  let fixture: ComponentFixture<WorkshopManageComponent>;
  let commonService: CommonService;

  beforeEach(async () => {
    TokenServiceSpy.getUsername.and.returnValue(`$L_${libStub().username}`);
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
        CommonService,
      ],
      declarations: [ 
        WorkshopManageComponent,
        LibrarianHeaderComponent,
        SiteFooterComponent,
        WorkshopListComponent,
      ]
    })
    .compileComponents();
    commonService = TestBed.inject(CommonService);
  });

  beforeEach(() => {
    spyOn(commonService, 'setSubject');
    fixture = TestBed.createComponent(WorkshopManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call commonService to set username in header', ()=>{
    expect(commonService.setSubject).toHaveBeenCalledWith(libStub().username);
  })
});
