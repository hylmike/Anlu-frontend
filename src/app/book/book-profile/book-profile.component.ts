import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ActivatedRoute, Router } from '@angular/router';

import { Book, BookComment, BookCommentDto } from '../../common/book-dto';
import { BookService } from '../book.service';
import { FormBuilder } from '@angular/forms';
import { TokenStorageService } from '../../auth/token-storage.service';
import { CommonService } from '../../common/common.service';
import { ReaderService } from '../../reader/reader.service';
import { ReaderAuthService } from '../../auth/reader-auth.service';
import { ReaderReadHistory } from '../../common/reader.dto';

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
    this.bookService.getBook(bookID).subscribe((eBook: Book) => {
      if (eBook && eBook.bookTitle) {
        this.book = eBook;
        this.book.coverPic = this.book.coverPic.slice(2,);
        this.book.bookFile = this.book.bookFile.slice(2,);
        this.logger.info(`Success load profile of ${bookID}`)
      } else {
        this.logger.warn(`Failed to load ${bookID} profile from server`);
      }
      //Load the existing comments and display in page
      const existComments = document.querySelector('div.existing-comments');
      if (eBook.comments.length > 0) {
        this.bookService.getBookComments(bookID).subscribe((comments: BookComment[]) => {
          if (comments && comments.length > 0) {
            this.logger.info(`Success load comments of book ${bookID}`)
            for (const item of comments) {
              let p1 = document.createElement('p');
              p1.className = 'comment-item';
              p1.innerHTML = item.comment;
              p1.style.fontSize = 'large';
              p1.style.fontFamily = 'Times New Roman';
              let p2 = document.createElement('p');
              p2.className = 'comment-item';
              p2.innerHTML = `---by ${item.readerName}`;
              p2.style.fontSize = 'large';
              p2.style.fontFamily = 'Times New Roman';
              existComments.appendChild(p1);
              existComments.appendChild(p2);
            }
          }
        });
      } else {
        let p1 = document.createElement('p');
        p1.className = 'comment-item';
        p1.innerHTML = 'Be the first person to write comments!';
        p1.style.fontSize = 'large';
        p1.style.fontFamily = 'Times New Roman';
        existComments.appendChild(p1);
      }
      this.commentForm.setValue({
        bookID: bookID,
        readerName: readerName,
        title: '',
        comment: '',
      });
    });
    //If book is in favor book list, disable add fovoriteBook button
    let favorInd = false;
    this.readerService.getFavorList(readerID).subscribe((data: Book[]) => {
      if (data && data.length > 0) {
        for (const item of data) {
          if (item._id === bookID) {
            favorInd = true;
            break;
          }
        }
        if (favorInd) {
          const addFavorButton = document.querySelector('button.add-favorites') as HTMLButtonElement;
          addFavorButton.disabled = true;
        }
      }
    });
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

  playBook() {
    const bookID = this.book._id;
    const readerID = this.readerAuthService.getReaderID();
    let currentPage = 0;
    this.readerService.getReadHistory(readerID).subscribe((data: ReaderReadHistory[]) => {
      if (data) {
        for (const item of data) {
          if (item.bookID === bookID) {
            currentPage = item.currentPage;
            break;
          }
        }
      }
      this.router.navigateByUrl(`/book/play/${bookID}/${currentPage}`);
    });
  }

  addFavorBook() {
    const bookID = this.book._id;
    const readerID = this.readerAuthService.getReaderID();
    this.readerService.addFavorBook(readerID, { bookID: bookID }).subscribe((data) => {
      if (data > 0) {
        const addFavorButton = document.querySelector('button.add-favorites') as HTMLButtonElement;
        addFavorButton.disabled = true;
        this.logger.info(`Success add favor book ${bookID} for reader ${readerID}`);
      } else {
        this.logger.warn(`Failed to add favor book ${bookID} for reader ${readerID}`);
      }
    });
  }

  createComment() {
    const commentInfo: BookCommentDto = this.commentForm.value;
    if (commentInfo.comment) {
      this.bookService.addBookComment(commentInfo).subscribe((data: BookComment) => {
        if (data) {
          const existComments = document.querySelector('div.existing-comments');
          let p1 = document.createElement('p');
          p1.className = 'comment-item';
          p1.innerHTML = data.comment;
          p1.style.fontSize = 'large';
          p1.style.fontFamily = 'Times New Roman';
          let p2 = document.createElement('p');
          p2.className = 'comment-item';
          p2.innerHTML = `---by ${data.readerName}`;
          p2.style.fontSize = 'large';
          p2.style.fontFamily = 'Times New Roman';
          existComments.appendChild(p1);
          existComments.appendChild(p2);
          this.logger.info(`Success add comment for book ${this.book._id}`)

        } else {
          this.logger.warn(`Failed to add comment for book ${this.book._id}`)
        }
      })
    }
  }

}
