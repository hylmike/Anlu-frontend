import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiobookPortalComponent } from './audiobook-portal.component';

describe('AudiobookPortalComponent', () => {
  let component: AudiobookPortalComponent;
  let fixture: ComponentFixture<AudiobookPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudiobookPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiobookPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
