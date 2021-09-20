import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastPortalComponent } from './podcast-portal.component';

describe('PodcastPortalComponent', () => {
  let component: PodcastPortalComponent;
  let fixture: ComponentFixture<PodcastPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
