import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { BookService } from 'src/app/book/book.service';
import { bookStub } from 'src/test/book.stub';
import { BookServiceSpy, LoggerSpy } from 'src/test/mock.service';

import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let delBookSpy: jasmine.Spy;

  beforeEach(async () => {
    delBookSpy = BookServiceSpy.delBook.and.returnValue(of(bookStub()._id));
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
      declarations: [ BookListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call BookService to delete book', ()=>{
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'pageReload').and.callFake(function(){});
    component.delBook(bookStub()._id);
    fixture.autoDetectChanges();
    expect(delBookSpy).toHaveBeenCalledWith(bookStub()._id);
  })
});
