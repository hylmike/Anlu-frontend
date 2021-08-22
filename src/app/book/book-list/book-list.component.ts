import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

import { Book } from '../../common/book-dto';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnChanges {

  @Input() bookList: Book[] = [];

  constructor(
    private logger: NGXLogger,
  ) { }

  ngOnInit(): void {
    const listContainer = document.querySelector('div.book-list');
    const loadButton = document.querySelector('button.load-link') as HTMLButtonElement;
    if (this.bookList && this.bookList.length > 0) {
      if (loadButton.disabled) loadButton.disabled = false;
      this.loadBook(0);
    } else {
      const p1 = document.createElement('p');
      p1.innerHTML = "Can't find any book ...";
      p1.className = 'empty-result';
      listContainer.appendChild(p1);
      if (!loadButton.disabled) loadButton.disabled = true;
      this.logger.warn("Can't find any book ...")
    }
  }

  ngOnChanges() {
    const listContainer = document.querySelector('div.book-list');
    const loadButton = document.querySelector('button.load-link') as HTMLButtonElement;
    //Befor updating the book list area, clear all the old elements
    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    //Then update the book list area
    if (this.bookList && this.bookList.length > 0) {
      if (loadButton.disabled) loadButton.disabled = false;
      this.loadBook(0);
    } else {
      const p1 = document.createElement('p');
      p1.innerHTML = "Can't find any book ...";
      p1.className = 'empty-result';
      p1.style.color = 'gray';
      p1.style.fontSize = 'xx-large';
      p1.style.padding = '30px';
      listContainer.appendChild(p1);
      const loadButton = document.querySelector('button.load-link') as HTMLButtonElement;
      if (!loadButton.disabled) loadButton.disabled = true;
      this.logger.warn("Can't find any book ...");
    }
  }

  loadMore() {
    const listContainer = document.querySelector('div.book-list');
    const currentNum = listContainer.childElementCount;
    this.loadBook(currentNum);
  }

  loadBook(startNum: number) {
    const listContainer = document.querySelector('div.book-list');
    const endNum = this.bookList.length - startNum > 12 ? startNum + 12 : this.bookList.length
    for (let i = startNum; i < endNum; i++) {
      let divCol = document.createElement('div');
      divCol.className = 'col-lg-2 col-sm-4 column';
      listContainer.appendChild(divCol);
      let divCard = document.createElement('div');
      divCard.className = 'book-card';
      divCol.appendChild(divCard);
      let bookLink = document.createElement('a');
      bookLink.className = 'img-link';
      bookLink.href = `/book/profile/${this.bookList[i]._id}`;
      divCard.appendChild(bookLink);
      let coverImg = document.createElement('img');
      coverImg.src = this.bookList[i].coverPic;
      coverImg.alt = 'cover-img';
      coverImg.className = 'book-cover';
      coverImg.style.width = '80%';
      coverImg.style.height = '180px';
      bookLink.appendChild(coverImg);
      let bookTitle = document.createElement('h3');
      bookTitle.className = 'book-title';
      bookTitle.innerHTML = this.bookList[i].bookTitle;
      divCard.appendChild(bookTitle);
      let bookAuthor = document.createElement('p');
      bookAuthor.className = 'book-author';
      bookAuthor.innerHTML = this.bookList[i].author;
      divCard.appendChild(bookAuthor);
    }
    if (endNum >= this.bookList.length) {
      const loadButton = document.querySelector('button.load-link') as HTMLButtonElement;
      loadButton.disabled = true;
    }
  }

}
