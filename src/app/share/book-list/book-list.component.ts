import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NGXLogger } from 'ngx-logger';

import { Book } from '../../common/book-dto';
import { BookService } from '../../book/book.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() bookList: Book[] = [];
  @Input() role: string = 'reader';
  @Input() listName: string = '';

  divID: string = '';
  buttonID: string = '';

  constructor(
    private logger: NGXLogger,
    private bookService: BookService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    //Define the id of listContainer and loadButton
    if (!this.divID) {
      this.divID = `${this.listName}Div`;
      this.buttonID = `${this.listName}Button`;
    }
  }

  ngAfterViewInit() {
    const listContainer = document.getElementById(this.divID) as HTMLDivElement;
    const loadButton = document.getElementById(
      this.buttonID
    ) as HTMLButtonElement;
    if (this.bookList && this.bookList.length > 0) {
      //Before updating the book list area, clear all the old elements
      while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
      }
      //Check the load button property and load the book list
      if (loadButton.disabled) loadButton.disabled = false;
      this.loadBook(0);
    } else {
      const p1 = document.createElement('p');
      this.translate.stream('bookList.emptyDesc').subscribe((res) => {
        p1.innerHTML = res;
      });
      p1.className = 'empty-result';
      p1.style.color = 'gray';
      p1.style.fontSize = 'xx-large';
      p1.style.padding = '30px';
      listContainer.appendChild(p1);
      if (!loadButton.disabled) loadButton.disabled = true;
      this.logger.warn("Can't find any book ...");
    }
  }

  ngOnChanges() {
    const listContainer = document.getElementById(this.divID) as HTMLDivElement;
    const loadButton = document.getElementById(
      this.buttonID
    ) as HTMLButtonElement;
    if (listContainer) {
      while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
      }
      //Then update the book list area
      if (this.bookList && this.bookList.length > 0) {
        if (loadButton.disabled) loadButton.disabled = false;
        this.loadBook(0);
      } else {
        const p1 = document.createElement('p');
        this.translate.stream('bookList.emptyDesc').subscribe((res) => {
          p1.innerHTML = res;
        });
        p1.className = 'empty-result';
        p1.style.color = 'gray';
        p1.style.fontSize = 'xx-large';
        p1.style.padding = '30px';
        listContainer.appendChild(p1);
        if (!loadButton.disabled) loadButton.disabled = true;
        this.logger.warn("Can't find any book ...");
      }
    }
  }

  loadMore() {
    const listContainer = document.getElementById(this.divID) as HTMLDivElement;
    const currentNum = listContainer.childElementCount;
    this.loadBook(currentNum);
  }

  loadBook(startNum: number) {
    const listContainer = document.getElementById(this.divID) as HTMLDivElement;
    const loadButton = document.getElementById(
      this.buttonID
    ) as HTMLButtonElement;
    const endNum =
      this.bookList.length - startNum > 12
        ? startNum + 12
        : this.bookList.length;
    for (let i = startNum; i < endNum; i++) {
      let divCol = document.createElement('div');
      divCol.className = 'col-lg-2 col-sm-4 column';
      listContainer.appendChild(divCol);
      let divCard = document.createElement('div');
      divCard.className = 'book-card';
      divCard.style.marginTop = '10px';
      divCard.style.position = 'relative';
      divCard.style.height = '280px';
      divCol.appendChild(divCard);
      let coverImg = document.createElement('img');
      coverImg.src = this.bookList[i].coverPic;
      coverImg.alt = 'cover-img';
      coverImg.className = 'book-cover';
      coverImg.style.width = '80%';
      coverImg.style.height = '180px';
      if (this.role === 'reader') {
        let bookLink = document.createElement('a');
        bookLink.className = 'img-link';
        bookLink.href = `/book/profile/${this.bookList[i]._id}`;
        divCard.appendChild(bookLink);
        bookLink.appendChild(coverImg);
      } else {
        divCard.appendChild(coverImg);
      }
      let titleDiv = document.createElement('div');
      titleDiv.style.height = '2.5rem';
      titleDiv.style.overflow = 'hidden';
      titleDiv.style.paddingTop = '5px';
      titleDiv.style.paddingBottom = '5px';
      divCard.appendChild(titleDiv);
      let bookTitle = document.createElement('h3');
      bookTitle.className = 'book-title';
      bookTitle.style.lineHeight = '1.2';
      bookTitle.innerHTML = this.bookList[i].bookTitle;
      titleDiv.appendChild(bookTitle);
      if (this.role === 'reader') {
        let bookAuthor = document.createElement('p');
        bookAuthor.className = 'book-author';
        bookAuthor.innerHTML = this.bookList[i].author;
        bookAuthor.style.fontSize = 'medium';
        bookAuthor.style.position = 'absolute';
        bookAuthor.style.top = '240px';
        bookAuthor.style.width = '100%';
        bookAuthor.style.overflow = 'hidden';
        bookAuthor.style.textOverflow = 'ellipsis';
        bookAuthor.style.whiteSpace = 'nowrap';
        divCard.appendChild(bookAuthor);
      }
      if (this.role === 'admin' || this.role === 'librarian') {
        let action1: string, action2: string, action3: string;
        this.translate.stream(['bookList.action-1', 'bookList.action-2', 'bookList.action-3']).subscribe((res)=>{
          action1 = res['bookList.action-1'];
          action2 = res['bookList.action-2'];
          action3 = res['bookList.action-3'];
        })
        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-section';
        buttonDiv.style.fontSize = 'small';
        divCard.appendChild(buttonDiv);
        let reviewButton = document.createElement('a');
        reviewButton.className = 'btn btn-primary review-info';
        reviewButton.href = `/book/reviewinfo/${this.bookList[i]._id}`;
        reviewButton.innerHTML = action1;
        reviewButton.style.padding = '5px';
        reviewButton.style.marginRight = '5px';
        reviewButton.style.marginTop = '5px';
        let updateButton = document.createElement('a');
        updateButton.className = 'btn btn-primary update-info';
        updateButton.href = `/book/update/${this.bookList[i]._id}`;
        updateButton.innerHTML = action2;
        updateButton.style.padding = '5px';
        updateButton.style.marginRight = '5px';
        updateButton.style.marginTop = '5px';
        buttonDiv.appendChild(reviewButton);
        buttonDiv.appendChild(updateButton);
        if (this.role === 'admin') {
          let delButton = document.createElement('button');
          delButton.className = 'btn btn-primary del-link';
          delButton.innerHTML = action3;
          delButton.style.padding = '5px';
          delButton.style.marginTop = '5px';
          delButton.addEventListener(
            'click',
            this.delBook.bind(this, this.bookList[i]._id)
          );
          buttonDiv.appendChild(delButton);
        }
      }
    }
    if (endNum >= this.bookList.length) {
      loadButton.disabled = true;
    }
  }

  delBook(bookID: string) {
    let delNotice1: string, delNotice2: string;
    this.translate.stream(['bookList.delNotice-1', 'bookList.delNotice-2'], {id:bookID}).subscribe((res) => {
      delNotice1 = res['bookList.delNotice-1'];
      delNotice2 = res['bookList.delNotice-2'];
    });
    if (window.confirm(delNotice1)) {
      this.bookService.delBook(bookID).subscribe((data) => {
        if ((data = bookID)) {
          this.logger.info(`Success delete the book ${bookID}`);
          window.alert(delNotice2);
          this.pageReload();
        } else {
          this.logger.warn(`Failed to delete book ${bookID} in service side`);
        }
      });
    }
  }

  pageReload() {
    location.reload();
  }

  ngOnDestroy() {
    if (this.role === 'admin') {
      const deleteButtons = document.querySelectorAll('button.del-link');
      if (deleteButtons && deleteButtons.length > 0) {
        for (let i = 0; i < deleteButtons.length; i++) {
          deleteButtons[i].replaceWith(deleteButtons[i].cloneNode(true));
        }
      }
      this.logger.info(
        'Success cleaned all eventListeners added by book-manage component'
      );
    }
  }
}
