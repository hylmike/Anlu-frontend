import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    public translate: TranslateService,
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

  clickPodcast() {
    const allPodcastLink = document.getElementById('allpodcast-link');
    allPodcastLink.click();
  }

  setBookList(format: string, scope: string) {
    this.bookService.findAllBook(format).subscribe((books: Book[]) => {
      if (books && books.length > 0) {
        this.bookList = books;
        this.logger.info(`Success fetched all ${format} book from server`);
        switch (scope) {
          case 'All':
            this.bookList = [...books];
            break;
          default:
            const scopeList = scope.split('');
            this.bookList = books.filter((book) =>
              scopeList.includes(book.bookTitle[0].toUpperCase())
            );
        }
      } else {
        this.logger.warn(`Failed to fetch all ${format} book from server`);
      }
    });
  }

}
