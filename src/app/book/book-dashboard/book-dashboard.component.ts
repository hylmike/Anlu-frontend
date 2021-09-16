import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.css']
})
export class BookDashboardComponent implements OnInit {

  bookSummary: [];

  constructor(
    private commonService: CommonService,
    private tokenService: TokenStorageService,
    private logger: NGXLogger,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    //Set the username in header
    const libName = this.tokenService.getUsername().slice(3,);
    this.commonService.setSubject(libName);
    //Get book summary data from server
    this.bookService.getInventorySum().subscribe((sumList: []) => {
      if (sumList.length > 0) {
        this.bookSummary = sumList;
        this.logger.info('Success get book inventory summary from server');
      }
    })
  }

}
