import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ReaderAuthServiceSpy, TokenServiceSpy } from 'src/test/mock.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    ReaderAuthServiceSpy.isLoggedIn.and.returnValue(true);
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ReaderAuthService,
          useValue: ReaderAuthServiceSpy,
        }
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
