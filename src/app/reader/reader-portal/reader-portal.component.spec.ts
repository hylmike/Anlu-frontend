import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderPortalComponent } from './reader-portal.component';

describe('ReaderPortalComponent', () => {
  let component: ReaderPortalComponent;
  let fixture: ComponentFixture<ReaderPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
