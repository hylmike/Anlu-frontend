import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { libStub } from 'src/test/lib.stub';
import { TokenServiceSpy } from 'src/test/mock.service';

import { AdminPortalComponent } from './admin-portal.component';

@Component({ selector: 'app-admin-header', template: '' })
class AdminHeaderComponent {
}

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

describe('AdminPortalComponent', () => {
  let component: AdminPortalComponent;
  let fixture: ComponentFixture<AdminPortalComponent>;
  let getNameSpy: jasmine.Spy;
  let commonService: CommonService;

  beforeEach(async () => {
    getNameSpy = TokenServiceSpy.getUsername.and.returnValue(`$A_${libStub().username}`);
    await TestBed.configureTestingModule({
      providers: [
        CommonService,
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        },
      ],
      declarations: [
        AdminPortalComponent,
        AdminHeaderComponent,
        SiteFooterComponent,
      ]
    })
      .compileComponents();
    commonService = TestBed.inject(CommonService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPortalComponent);
    component = fixture.componentInstance;
    spyOn(commonService, 'setSubject');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsername service to set username in header', () => {
    expect(getNameSpy).toHaveBeenCalledWith();
    expect(commonService.setSubject).toHaveBeenCalledWith(libStub().username);
  })
});
