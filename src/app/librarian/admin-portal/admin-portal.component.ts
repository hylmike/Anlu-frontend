import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BookService } from 'src/app/book/book.service';
import { Book } from 'src/app/common/book-dto';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

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
  role = 'Admin';
  listName = 'topnBook';

  constructor(
    private commonService: CommonService,
    private tokenService: TokenStorageService,
    private bookService: BookService,
    private logger: NGXLogger,
  ) { }

  ngOnInit(): void {
    const adminName = this.tokenService.getUsername().slice(3,);
    if (adminName) {
      this.commonService.setSubject(adminName);
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
