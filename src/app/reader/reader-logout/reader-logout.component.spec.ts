import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderLogoutComponent } from './reader-logout.component';

describe('LogoutComponent', () => {
  let component: ReaderLogoutComponent;
  let fixture: ComponentFixture<ReaderLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
