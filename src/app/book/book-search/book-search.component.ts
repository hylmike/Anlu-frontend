import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Book } from 'src/app/common/book-dto';
import { CommonService } from 'src/app/common/common.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  bookList: Book[];
  role = 'reader';
  listName = 'searchBook';

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private readerAuthService: ReaderAuthService,
    private bookService: BookService,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.role = this.route.snapshot.paramMap.get('role');
    let username = this.tokenService.getUsername();
    if (this.role === 'admin' || this.role === 'librarian') {
      username = username.slice(3,);
    } else if (!this.readerAuthService.isLoggedIn()) {
      username = 'Our Guest';
    }
    if (username) {
      this.commonService.setSubject(username);
    }
    //const searchValue = this.route.snapshot.queryParamMap.get('sval');
    this.route.queryParamMap.subscribe((queryPara) => {
      const searchValue = queryPara.get('sval');
      this.bookService.searchBook(searchValue).subscribe((bookList: Book[]) => {
        if (bookList && bookList.length > 0) {
          this.bookList = bookList;
          this.logger.info('Success generate book list with search condition')
        } else {
          this.bookList = [];
          this.logger.info('Can not find anything with search condition')
        }
      })
    })
  }

}
