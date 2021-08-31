import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'src/app/common/book-dto';
import { BookService } from '../book.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  book: Book;
  updateBookUrl: string = '#';
  isAdmin: boolean = false;

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private bookService: BookService,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    const libName = this.tokenService.getUsername();
    if (libName.slice(0,3)==='$A_') this.isAdmin=true;
    this.commonService.setSubject(libName.slice(3,));
    const bookID = this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(bookID).subscribe((book: Book) => {
      if (book && book.bookTitle) {
        this.book = book;
        this.updateBookUrl = `/book/update/${bookID}`;
      }
    })
    
  }

}
