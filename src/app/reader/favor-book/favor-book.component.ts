import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Book } from 'src/app/common/book-dto';
import { CommonService } from 'src/app/common/common.service';
import { ReaderService } from '../reader.service';

@Component({
  selector: 'app-favor-book',
  templateUrl: './favor-book.component.html',
  styleUrls: ['./favor-book.component.css']
})
export class FavorBookComponent implements OnInit {

  bookList: Book[];

  constructor(
    private logger: NGXLogger,
    private readerService: ReaderService,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    private readerAuthService: ReaderAuthService,
  ) { }

  ngOnInit(): void {
    const readerName = this.tokenService.getUsername();
    this.commonService.setSubject(readerName);
    const loadButton = document.querySelector('button.load-link') as HTMLButtonElement;
    loadButton.disabled = true;
    const readerID = this.readerAuthService.getReaderID();
    this.readerService.getFavorList(readerID).subscribe((bList: Book[]) => {
      if (bList && bList.length >= 0) {
        this.bookList = bList;
        this.renderBookList(0);
        this.logger.info('Success render my favor book list');
      } else {
        this.logger.warn('Failed to get favor book list from server');
      }
    })
  }

  renderBookList(startNum: number) {
    const listContainer = document.querySelector('div.favor-list');
    const loadButton = document.querySelector('button.load-link') as HTMLButtonElement;
    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    if (this.bookList.length == 0) {
      const p1 = document.createElement('p');
      p1.innerHTML = "You haven't added any book in favorite list ...";
      p1.className = 'empty-result';
      listContainer.appendChild(p1);
      if (!loadButton.disabled) loadButton.disabled = true;
    } else {
      const endNum = this.bookList.length - startNum > 12 ? startNum + 12 : this.bookList.length
      for (let i = startNum; i < endNum; i++) {
        let divCol = document.createElement('div');
        divCol.className = 'col-lg-2 col-sm-4 column';
        listContainer.appendChild(divCol);
        let divCard = document.createElement('div');
        divCard.className = 'book-card';
        divCard.style.marginTop = '10px';
        divCard.style.textAlign = 'center';
        divCol.appendChild(divCard);
        let coverImg = document.createElement('img');
        coverImg.src = this.bookList[i].coverPic;
        coverImg.alt = 'cover-img';
        coverImg.className = 'book-cover';
        coverImg.style.width = '80%';
        coverImg.style.height = '180px';
        let bookLink = document.createElement('a');
        bookLink.className = 'img-link';
        bookLink.href = `/book/profile/${this.bookList[i]._id}`;
        divCard.appendChild(bookLink);
        bookLink.appendChild(coverImg);
        let bookTitle = document.createElement('h3');
        bookTitle.className = 'book-title';
        bookTitle.innerHTML = this.bookList[i].bookTitle;
        divCard.appendChild(bookTitle);
        let bookAuthor = document.createElement('p');
        bookAuthor.className = 'book-author';
        bookAuthor.innerHTML = this.bookList[i].author;
        divCard.appendChild(bookAuthor);
        //Create the delete link
        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-section';
        buttonDiv.style.fontSize = 'small';
        divCard.appendChild(buttonDiv);
        let delButton = document.createElement('button');
        delButton.className = 'btn btn-primary del-link';
        delButton.innerHTML = 'Delete';
        delButton.style.padding = '5px';
        delButton.style.marginTop = '5px';
        delButton.addEventListener('click', this.delFavorBook.bind(this, this.bookList[i]._id));
        buttonDiv.appendChild(delButton);

      }
      if (endNum >= this.bookList.length) {
        loadButton.disabled = true;
      } else {
        loadButton.disabled = false;
      }
    }
  }

  loadMore() {
    const listContainer = document.querySelector('div.favor-list') as HTMLDivElement;
    const currentNum = listContainer.childElementCount;
    this.renderBookList(currentNum);
  }

  delFavorBook(bookID) {
    const readerID = this.readerAuthService.getReaderID();
    const favorBookDto = { bookID: bookID }
    if (window.confirm('Please confirm if you want to remove it from favor list')) {
      this.readerService.delFavorBook(readerID, favorBookDto).subscribe((data) => {
        if (data >= 0) {
          this.logger.info(`Success delete the book from favor list`);
          location.reload();
        } else {
          this.logger.warn(`Failed to delete book from favor list`);
        }
      })
    }
  }

  ngOnDestroy() {
    const deleteButtons = document.querySelectorAll('button.del-link');
    if (deleteButtons && deleteButtons.length > 0) {
      for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].replaceWith(deleteButtons[i].cloneNode(true));
      }
    }
    this.logger.info('Success cleaned all eventListeners added by favor book component');
  }

}
