import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderAnalysisComponent } from './reader-analysis.component';

describe('ReaderAnalysisComponent', () => {
  let component: ReaderAnalysisComponent;
  let fixture: ComponentFixture<ReaderAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
