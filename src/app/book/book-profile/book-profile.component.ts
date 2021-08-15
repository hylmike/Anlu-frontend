import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ActivatedRoute, Router } from '@angular/router';

import { Book, BookCommentDto } from '../../common/book-dto';
import { BookService } from '../book.service';
import { FormBuilder } from '@angular/forms';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { ReaderService } from 'src/app/reader/reader.service';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { ReaderReadHistory } from 'src/app/common/reader.dto';

@Component({
  selector: 'app-book-profile',
  templateUrl: './book-profile.component.html',
  styleUrls: ['./book-profile.component.css']
})
export class BookProfileComponent implements OnInit {

  book: Book;

  constructor(
    private logger: NGXLogger,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    private readerAuthService: ReaderAuthService,
    private readerService: ReaderService,
  ) { }

  commentForm = this.fb.group({
    bookID: [''],
    readerName: [''],
    title: [''],
    comment: [''],
  });

  ngOnInit(): void {
    const bookID = this.route.snapshot.paramMap.get('id');
    const readerName = this.tokenService.getUsername();
    this.commonService.setSubject(readerName);
    const readerID = this.readerAuthService.getReaderID();
    this.bookService.getBook(bookID).subscribe((data: Book) => {
      if (data && data.bookTitle) {
        this.book = data;
        this.logger.info(`Success load profile of ${bookID}`)
      } else {
        this.logger.warn(`Failed to load ${bookID} profile from server`);
      }
      //If book is in favor book list, disable add fovoriteBook button
      let favorInd = false;
      this.readerService.getFavorList(readerID).subscribe((data) => {
        if (data && data.length > 0) {
          for (const item of data) {
            if (item.bookID === bookID) {
              favorInd = true;
              break;
            }
          }
          if (favorInd) {
            const addFavorButton = document.querySelector('button.add-favorites') as HTMLButtonElement;
            addFavorButton.disabled = true;
          }
        }
      })
      //Load the existing comments and display in page
      if (data.comments.length > 0) {

      }
      this.commentForm.setValue({
        bookID: [data._id],
        readerName: [readerName],
        title: [''],
        comment: [''],
      })
    })
  }

  readBook() {
    const bookID = this.book._id;
    const readerID = this.readerAuthService.getReaderID();
    let currentPage = 1;
    this.readerService.getReadHistory(readerID).subscribe((data: ReaderReadHistory[]) => {
      if (data) {
        for (const item of data) {
          if (item.bookID === bookID) {
            currentPage = item.currentPage;
            break;
          }
        }
      }
      this.router.navigateByUrl(`/book/read/${bookID}/${currentPage}`);
    });
  }

  addFavorBook() {
    const bookID = this.book._id;
    const readerID = this.readerAuthService.getReaderID();
    this.readerService.addFavorBook(readerID, { bookID: bookID }).subscribe((data) => {
      if (data > 0) {
        this.logger.info(`Success add favor book ${bookID} for reader ${readerID}`);
      } else {
        this.logger.warn(`Failed to add favor book ${bookID} for reader ${readerID}`);
      }
    });
  }

  createComment() {
    const commentInfo: BookCommentDto = this.commentForm.value;
    if (commentInfo.comment) {
      this.bookService.addBookComment(commentInfo).subscribe((data) => {
        if (data) {
          this.logger.info(`Success add comment for book ${this.book._id}`)
        } else {
          this.logger.warn(`Failed to add comment for book ${this.book._id}`)
        }
      })
    }
  }

}
