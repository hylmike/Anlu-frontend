import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiobookPlayComponent } from './audiobook-play.component';

describe('AudiobookPlayComponent', () => {
  let component: AudiobookPlayComponent;
  let fixture: ComponentFixture<AudiobookPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudiobookPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiobookPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
