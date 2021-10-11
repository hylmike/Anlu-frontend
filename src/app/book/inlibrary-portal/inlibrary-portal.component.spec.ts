import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlibraryPortalComponent } from './inlibrary-portal.component';

describe('InlibraryPortalComponent', () => {
  let component: InlibraryPortalComponent;
  let fixture: ComponentFixture<InlibraryPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlibraryPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlibraryPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
