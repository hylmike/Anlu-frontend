import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { ReaderService } from 'src/app/reader/reader.service';
import { LoggerSpy, ReaderServiceSpy } from 'src/test/mock.service';
import { readerStub } from 'src/test/reader.stub';

import { ReaderAnalysisComponent } from './reader-analysis.component';

describe('ReaderAnalysisComponent', () => {
  let component: ReaderAnalysisComponent;
  let fixture: ComponentFixture<ReaderAnalysisComponent>;
  let getTopnSpy: jasmine.Spy;

  beforeEach(async () => {
    getTopnSpy = ReaderServiceSpy.getTopN.and.returnValue(of([readerStub()]));
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ReaderService,
          useValue: ReaderServiceSpy,
        },
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        },
        DatePipe
      ],
      imports: [ChartsModule],
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

  it('should call ReaderService to get topN list', ()=>{
    expect(getTopnSpy).toHaveBeenCalledWith(10)
  })
});
