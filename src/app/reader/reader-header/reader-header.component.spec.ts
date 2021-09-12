import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { CommonService } from 'src/app/common/common.service';
import { ReaderAuthServiceSpy, RouterSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { ReaderHeaderComponent } from './reader-header.component';

describe('ReaderHeaderComponent', () => {
  let component: ReaderHeaderComponent;
  let fixture: ComponentFixture<ReaderHeaderComponent>;
  let commonService: CommonService;
  let readerLoginSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    readerLoginSpy = ReaderAuthServiceSpy.isLoggedIn.and.returnValue(true);
    ReaderAuthServiceSpy.getReaderID.and.returnValue(readerStub()._id);
    await TestBed.configureTestingModule({
      providers: [
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
      declarations: [ReaderHeaderComponent]
    })
      .compileComponents();
    commonService = TestBed.inject(CommonService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderHeaderComponent);
    component = fixture.componentInstance;
    commonService.setSubject('testName');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ReaderAuthService to check login and set username', () => {
    expect(readerLoginSpy).toHaveBeenCalled;
    expect(component.userName).toEqual('testName');
  })

  it('should fill in right profile/favorbook url', () => {
    expect(component.profileUrl).toEqual(`/reader/profile/${readerStub()._id}`);
    expect(component.favorBookUrl).toEqual(`/reader/favorbook/${readerStub()._id}`);
  })

  it('should redirect to right url for seach', () => {
    component.searchForm.setValue({ searchValue: 'testbook'});
    const searchButton = document.querySelector('button.search') as HTMLButtonElement;
    searchButton.click();
    fixture.detectChanges();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/book/reader/search?sval=testbook');
  })
});
