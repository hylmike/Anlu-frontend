import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { libStub } from 'src/test/lib.stub';
import { TokenServiceSpy } from 'src/test/mock.service';

import { LibrarianPortalComponent } from './librarian-portal.component';

@Component({ selector: 'app-librarian-header', template: '' })
class LibrarianHeaderComponent {
}

@Component({ selector: 'app-site-footer', template: '' })
class SiteFooterComponent {
}

fdescribe('LibrarianPortalComponent', () => {
  let component: LibrarianPortalComponent;
  let fixture: ComponentFixture<LibrarianPortalComponent>;
  let getNameSpy: jasmine.Spy;

  beforeEach(async () => {
    getNameSpy = TokenServiceSpy.getUsername.and.returnValue(libStub().username);
    await TestBed.configureTestingModule({
      providers: [
        CommonService,
        {
          provide: TokenStorageService,
          useValue: TokenServiceSpy,
        }
      ],
      declarations: [ 
        LibrarianPortalComponent,
        LibrarianHeaderComponent,
        SiteFooterComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should call tokenService to get username', ()=>{
    expect(getNameSpy).toHaveBeenCalledWith();
  })
});
