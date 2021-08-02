import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderSignedComponent } from './reader-signed.component';

describe('ReaderSignedComponent', () => {
  let component: ReaderSignedComponent;
  let fixture: ComponentFixture<ReaderSignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderSignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderSignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
