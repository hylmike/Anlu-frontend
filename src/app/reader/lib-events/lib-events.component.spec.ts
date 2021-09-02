import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibEventsComponent } from './lib-events.component';

describe('LibEventsComponent', () => {
  let component: LibEventsComponent;
  let fixture: ComponentFixture<LibEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
