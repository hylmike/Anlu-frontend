import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Book } from 'src/app/common/book-dto';
import { CommonService } from 'src/app/common/common.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-manage',
  templateUrl: './book-manage.component.html',
  styleUrls: ['./book-manage.component.css']
})
export class BookManageComponent implements OnInit {

  isAdmin: Boolean = false;
  bookList: Book[];
  role: string = 'librarian';

  constructor(
    private logger: NGXLogger,
    private bookService: BookService,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    const username = this.tokenService.getUsername()
    if (username.slice(0, 3) === '$A_') {
      this.isAdmin = true;
      this.role = 'admin'
    }
    this.commonService.setSubject(username.slice(3,));
    const allEbookLink = document.getElementById('allebook-link');
    allEbookLink.click();
  }

  clickEbook() {
    const allEbookLink = document.getElementById('allebook-link');
    allEbookLink.click();
  }

  clickInLibraryBook() {
    const allHardbookLink = document.getElementById('allhardbook-link');
    allHardbookLink.click();
  }  

  clickAudiobook() {
    const allAbookLink = document.getElementById('allabook-link');
    allAbookLink.click();
  }

  setBookList(format: string, scope: string) {
    if (scope === 'All') {
      this.bookService.findAllBook(format).subscribe((books: Book[]) => {
        if (books && books.length > 0) {
          this.bookList = books;
          this.logger.info(`Success find all ${format} book from server`);
        } else {
          this.logger.warn(`Failed to find all ${format} book from server`);
        }
      })
    }
  }

}
