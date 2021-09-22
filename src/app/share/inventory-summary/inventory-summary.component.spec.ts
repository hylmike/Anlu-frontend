import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';
import { NGXLogger } from 'ngx-logger';
import { BookService } from 'src/app/book/book.service';
import { bookStub } from 'src/test/book.stub';
import { BookServiceSpy, LoggerSpy } from 'src/test/mock.service';

import { InventorySummaryComponent } from './inventory-summary.component';

describe('InventorySummaryComponent', () => {
  let component: InventorySummaryComponent;
  let fixture: ComponentFixture<InventorySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: BookServiceSpy,
        },
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        }
      ],
      imports: [ChartsModule],
      declarations: [ InventorySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorySummaryComponent);
    component = fixture.componentInstance;
    component.bookSummary = [{category: 'Romance', count: 2}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
