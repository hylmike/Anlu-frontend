import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogReviewComponent } from './log-review.component';

describe('LogReviewComponent', () => {
  let component: LogReviewComponent;
  let fixture: ComponentFixture<LogReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
