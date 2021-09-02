import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from '../../common/common.service';
import { NGXLogger } from 'ngx-logger';
import { Router, ActivatedRoute } from '@angular/router';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { Book } from 'src/app/common/book-dto';
import { BookService } from 'src/app/book/book.service';
import { ReaderService } from '../reader.service';

@Component({
  selector: 'app-reader-signed',
  templateUrl: './reader-signed.component.html',
  styleUrls: ['./reader-signed.component.css']
})
export class ReaderSignedComponent implements OnInit {

  readBookList: Book[] = [];
  favorBookList: Book[] = [];
  hotBookList: Book[] = [];
  role: string = 'reader';
  readBook = 'readBook';
  favorBook = 'favorBook';
  hotBook = 'hotBook';

  constructor(
    private commonService: CommonService,
    private storageService: TokenStorageService,
    private logger: NGXLogger,
    private router: Router,
    private readerAuthService: ReaderAuthService,
    private bookService: BookService,
    private readerService: ReaderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const readerID = this.readerAuthService.getReaderID();
    const idFromUrl = this.route.snapshot.paramMap.get('id');
    if (readerID === idFromUrl) {
      const readerName = this.storageService.getUsername();
      this.commonService.setSubject(readerName);
      this.logger.info(`Success load signed portal page for reader ${readerName}`);
    } else {
      this.router.navigateByUrl('/**');
    }
    //Generate recent read book list
    this.readerService.getReadHistory(readerID).subscribe((bList: Book[])=>{
      if (bList && bList.length>0) {
        this.readBookList = bList;
        this.logger.info(`Success get read booklist from server for reader ${readerID}`);
      }
    })
    //Generate favor book list
    this.readerService.getFavorList(readerID).subscribe((bList: Book[])=>{
      if (bList && bList.length>0) {
        this.favorBookList = bList;
        this.logger.info(`Success get favor booklist from server for reader ${readerID}`);
      }
    })
    //Generate hot book list
    this.bookService.findHotBooks(6).subscribe((bookList: Book[]) => {
      if (bookList && bookList.length > 0) {
        this.hotBookList = bookList;
        this.logger.info('Success get hot book list from server');
      } else {
        this.hotBookList = [];
      }
    })

  }

}
