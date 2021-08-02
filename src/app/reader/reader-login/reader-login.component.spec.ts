import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderLoginComponent } from './reader-login.component';

describe('LoginComponent', () => {
  let component: ReaderLoginComponent;
  let fixture: ComponentFixture<ReaderLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
