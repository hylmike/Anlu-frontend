import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BookService } from 'src/app/book/book.service';
import { Book } from 'src/app/common/book-dto';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-librarian-portal',
  templateUrl: './librarian-portal.component.html',
  styleUrls: ['./librarian-portal.component.css']
})
export class LibrarianPortalComponent implements OnInit {

  bookInventory: [];
  readerSummary = [
    { week: 'w30', readerCount: 5 },
    { week: 'w31', readerCount: 8 },
    { week: 'w32', readerCount: 15 },
    { week: 'w33', readerCount: 35 },
    { week: 'w34', readerCount: 55 },
    { week: 'w35', readerCount: 65 },
    { week: 'w36', readerCount: 85 },
    { week: 'w37', readerCount: 125 },
  ];
  topBookList: Book[];
  role = 'Librarian';
  listName = 'topnBook';

  constructor(
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    private bookService: BookService,
    private logger: NGXLogger,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const libName = this.tokenService.getUsername().slice(3,);
    if (libName) {
      this.commonService.setSubject(libName);
    }
    //Get book summary data from server
    this.bookService.getInventorySum().subscribe((sumList: []) => {
      if (sumList.length > 0) {
        this.bookInventory = sumList;
        this.logger.info('Success get book inventory summary from server');
      }
    })
    //Get top10 hottest book list
    this.bookService.findHotBooks(10).subscribe((topnList: Book[]) => {
      if (topnList && topnList.length > 0) {
        this.topBookList = topnList;
      }
    })
  }

}
