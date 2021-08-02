import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderChangePwdComponent } from './reader-change-pwd.component';

describe('ReaderChangePwdComponent', () => {
  let component: ReaderChangePwdComponent;
  let fixture: ComponentFixture<ReaderChangePwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderChangePwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
