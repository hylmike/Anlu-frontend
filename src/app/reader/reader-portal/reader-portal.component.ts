import { Component, OnInit } from '@angular/core';
import { ReaderAuthService } from '../../auth/reader-auth.service';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { BookService } from 'src/app/book/book.service';
import { Book } from 'src/app/common/book-dto';

@Component({
  selector: 'app-reader-portal',
  templateUrl: './reader-portal.component.html',
  styleUrls: ['./reader-portal.component.css']
})
export class ReaderPortalComponent implements OnInit {

  hotBookList: Book[];
  role = 'reader';

  hotBook = 'hotBook';

  constructor(
    private readerAuthService: ReaderAuthService,
    private libAuthService: LibrarianAuthService,
    private bookService: BookService,
    private logger: NGXLogger,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.readerAuthService.isLoggedIn()) {
      const readerID = this.readerAuthService.getReaderID();
      this.router.navigateByUrl(`/reader/signed/${readerID}`);
    } else {
      if (this.libAuthService.isLoggedIn()) {
        this.libAuthService.signOut().subscribe((libID) => {
          if (libID) {
            this.logger.info('Success remove previous logged lib info');
          } else {
            this.logger.warn('Failed logout of lib in server side');
          }
        })
      }
      this.logger.info('Success load reader portal for un-signed reader');
    }
    //Generate hot book list
    this.bookService.findHotBooks(10).subscribe((bookList: Book[]) => {
      if (bookList && bookList.length > 0) {
        this.hotBookList = bookList;
        this.logger.info('Success get hot book list from server');
      }
    })
  }

}
