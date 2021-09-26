import { HttpClient, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { bookCommentStub, bookStub, readRecordStub } from 'src/test/book.stub';
import { BookCommentDto, BookDto } from '../common/book-dto';
import { HandleError, HttpErrorHandler } from '../common/http-error-handler.service';

import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let errorHandlerSpy: jasmine.SpyObj<HttpErrorHandler>
  let handleError: HandleError;

  beforeEach(() => {
    //Mock the HttpErrorHandle service, also handleError function
    const spy = jasmine.createSpyObj('HttpErrorHandler', ['createHandleError', 'handleError']);
    spy.createHandleError.and.callFake(function (serviceName) {
      return (operation, result) => this.handleError(serviceName, operation, result);
    });
    TestBed.configureTestingModule({
      providers: [
        BookService,
        HttpClient,
        {
          provide: HttpErrorHandler,
          useValue: spy,
        }
      ],
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(BookService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    errorHandlerSpy = TestBed.inject(HttpErrorHandler) as jasmine.SpyObj<HttpErrorHandler>;
    handleError = errorHandlerSpy.createHandleError('WorkshopService');
  });

  afterEach(() => {
    //Verify if the http service was called correctly
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fileUpload', () => {
    it('should send POST http request and return file url', (done: DoneFn) => {
      const file = new File(['sample'], 'sample.txt', { type: 'text/plain' });
      service.fileUpload(file).subscribe((event) => {
        // Define what we expect after receiving the progress response
        if (event.type === HttpEventType.UploadProgress) {
          if (event.loaded > 0) {
            expect(event.loaded).toEqual(7);
            done();
          }
        }
      });
      const req = httpTestingController.expectOne('api/book/upload');
      expect(req.request.method).toEqual('POST');
      // Respond with a mocked UploadProgress HttpEvent
      req.event({ type: HttpEventType.UploadProgress, loaded: 7, total: 10 });
    })
  })

  describe('register', () => {
    it('should send POST request and return an Observable<Book>', () => {
      const dummyBook = bookStub();
      const bookRegDto: BookDto = {
        bookTitle: bookStub().bookTitle,
        isbnCode: bookStub().isbnCode,
        category: bookStub().category,
        format: bookStub().format,
        author: bookStub().author,
        language: bookStub().language,
        publisher: bookStub().publisher,
        publishDate: bookStub().publishDate.toString(),
        purchaseDate: bookStub().purchaseDate.toString(),
        coverPic: bookStub().coverPic,
        bookFile: bookStub().bookFile,
        price: bookStub().price.toString(),
        desc: bookStub().desc,
        keywords: bookStub().keywords,
        initialScore: bookStub().initialScore.toString(),
        creator: bookStub().creator,
        isActive: 'true',
      };

      service.register(bookRegDto).subscribe((book) => {
        expect(book).toEqual(dummyBook);
      })
      const req = httpTestingController.expectOne('/api/book/register');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyBook);
    })
  })

  describe('getBook', () => {
    it('should send get request and return an Observable<Book>', () => {
      const dummyBook = bookStub();

      service.getBook(bookStub()._id).subscribe((book) => {
        expect(book).toEqual(dummyBook);
      })
      const req = httpTestingController.expectOne(`/api/book/info/${bookStub()._id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummyBook);
    })
  })

  describe('findAllBook', () => {
    it('should send get request and return an Observable<[Book]>', () => {
      const dummyBookList = [bookStub()];

      service.findAllBook(bookStub().format).subscribe((bookList) => {
        expect(bookList).toEqual(dummyBookList);
      })
      const req = httpTestingController.expectOne(`/api/book/findall/${bookStub().format}`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummyBookList);
    })
  })

  describe('findBookList', () => {
    it('should send post request and return an Observable<[Book]>', () => {
      const dummyBookList = [bookStub()];
      const searchDto = {
        format: bookStub().format,
        category: bookStub().category,
        bookTitle: bookStub().bookTitle,
        author: bookStub().author,
        publishYear: bookStub().publishDate.getFullYear().toString(),
      };

      service.findBookList(searchDto).subscribe((bookList) => {
        expect(bookList).toEqual(dummyBookList);
      })
      const req = httpTestingController.expectOne('/api/book/findlist');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyBookList);
    })
  })

  describe('searchBook', () => {
    it('should send get request and return an Observable<[Book]>', () => {
      const dummyBookList = [bookStub()];
      const searchValue = bookStub().bookTitle;

      service.searchBook(searchValue).subscribe((bookList) => {
        expect(bookList).toEqual(dummyBookList);
      })
      const req = httpTestingController.expectOne(`/api/book/searchbook?sval=${searchValue}`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummyBookList);
    })
  })

  describe('findHotBooks', () => {
    it('should send get request and return an Observable<[Book]>', () => {
      const dummyBookList = [bookStub()];

      service.findHotBooks(3).subscribe((bookList) => {
        expect(bookList).toEqual(dummyBookList);
      })
      const req = httpTestingController.expectOne('/api/book/findhotbooks/3');
      expect(req.request.method).toEqual('GET');
      req.flush(dummyBookList);
    })
  })

  describe('getInventorySum', () => {
    it('should send get request and return an object>', () => {
      const dummyResult = [
        { category: 'Romance', count: 0 },
        { category: 'Politics', count: 0 },
        { category: 'Press', count: 0 },
        { category: 'Essay', count: 0 },
        { category: 'Information Technology', count: 1 },
        { category: 'Comic', count: 0 },
        { category: 'History', count: 0 },
        { category: 'Geography', count: 0 },
        { category: 'Dissertation', count: 0 },
        { category: 'Art', count: 0 },
        { category: 'Sport', count: 0 },
      ];

      service.getInventorySum().subscribe((result) => {
        expect(result).toEqual(dummyResult);
      })
      const req = httpTestingController.expectOne('/api/book/suminventory');
      expect(req.request.method).toEqual('GET');
      req.flush(dummyResult);
    })
  })

  describe('updateBookInfo', () => {
    it('should send patch request and return an Observable<Book>', () => {
      const dummyBook = bookStub();
      const updateBookDto: BookDto = {
        bookTitle: bookStub().bookTitle,
        isbnCode: bookStub().isbnCode,
        category: bookStub().category,
        format: bookStub().format,
        author: 'newAuthor',
        language: bookStub().language,
        publisher: bookStub().publisher,
        publishDate: bookStub().publishDate.toString(),
        purchaseDate: bookStub().purchaseDate.toString(),
        coverPic: '',
        bookFile: '',
        price: '100',
        desc: bookStub().desc,
        keywords: bookStub().keywords,
        initialScore: '900',
        creator: bookStub().creator,
        isActive: 'active',
      };

      service.updateBookInfo(updateBookDto).subscribe((book) => {
        expect(book).toEqual(dummyBook);
      })
      const req = httpTestingController.expectOne('/api/book/update');
      expect(req.request.method).toEqual('PATCH');
      req.flush(dummyBook);
    })
  })

  describe('delBook', () => {
    it('should send get request and return an Observable<Book>', () => {
      const dummyID = bookStub()._id

      service.delBook(bookStub()._id).subscribe((book) => {
        expect(book).toEqual(dummyID);
      })
      const req = httpTestingController.expectOne(`/api/book/del/${bookStub()._id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(dummyID);
    })
  })

  describe('addBookComment', () => {
    it('should send post request and return an Observable<Comment>', () => {
      const dummyComment = bookCommentStub();
      const bookCommentDto: BookCommentDto = {
        bookID: bookCommentStub().book,
        readerName: bookCommentStub().readerName,
        title: bookCommentStub().title,
        comment: bookCommentStub().comment,
      };

      service.addBookComment(bookCommentDto).subscribe((bComment) => {
        expect(bComment).toEqual(dummyComment);
      })
      const req = httpTestingController.expectOne('/api/book/addcomment');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyComment);
    })
  })

  describe('getBookComments', () => {
    it('should send post request and return an Observable<[Comment]>', () => {
      const dummyCommentList = [bookCommentStub()];

      service.getBookComments(bookStub()._id).subscribe((bCommentList) => {
        expect(bCommentList).toEqual(dummyCommentList);
      })
      const req = httpTestingController.expectOne(`/api/book/${bookStub()._id}/getcomments`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummyCommentList);
    })
  })

  describe('addReadRecord', () => {
    it('should send post request and return an Observable<ReadRecord>', () => {
      const dummyRecord = readRecordStub();
      const readRecordDto = {
        bookID: readRecordStub().book,
        readerID: readRecordStub().readerID,
        startTime: readRecordStub().startTime,
        currentPage: 100,
        duration: readRecordStub().duration,
      };

      service.addReadRecord(readRecordDto).subscribe((readRecord) => {
        expect(readRecord).toEqual(dummyRecord);
      })
      const req = httpTestingController.expectOne('/api/book/addreadrecord');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyRecord);
    })
  })
});
