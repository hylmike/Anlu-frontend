import { style } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { Book, BookWish, CreateWishDto, SearchBookDto } from '../../common/book-dto';
import { BookService } from '../book.service';

@Component({
  selector: 'app-ebook-portal',
  templateUrl: './ebook-portal.component.html',
  styleUrls: ['./ebook-portal.component.css']
})
export class EbookPortalComponent implements OnInit, AfterViewInit, OnDestroy {

  ebookList: Book[];
  role: string = 'reader';
  listName = 'catBook';
  listBlock: boolean = true;
  readerName: string;

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private bookService: BookService,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    private datePipe: DatePipe,
  ) { }

  searchForm = this.fb.group({
    format: ['eBook'],
    bookType: ['Online'],
    category: [''],
    bookTitle: [''],
    author: [''],
    publishYear: [''],
  })

  wishForm = this.fb.group({
    bookTitle: [''],
    language: [''],
    format: [''],
    creator: [''],
  })

  ngOnInit(): void {
    this.readerName = this.tokenService.getUsername();
    this.commonService.setSubject(this.readerName);
    this.wishForm.setValue({
      bookTitle: '',
      language: 'English',
      format: 'eBook',
      creator: this.readerName,
    })
    const allLink = document.getElementById('allLink') as HTMLButtonElement;
    allLink.click();
  }

  ngAfterViewInit() {
    const navEbook = document.getElementById('nav-ebook');
    const navHome = document.getElementById('nav-myLibrary')
    if (!navEbook.className.includes('active')) {
      navEbook.className += ' active';
      navHome.className = navHome.className.slice(0, -7);
    }
  }

  setBookList(categoryInput: string) {
    if (categoryInput === 'All') {
      this.bookService.findAllBook('eBook').subscribe((data: []) => {
        if (data && data.length > 0) {
          this.ebookList = data;
          this.logger.info('Succes load all eBook list');
        } else if (data && data.length == 0) {
          this.ebookList = [];
          this.logger.info('No eBook in database');
        } else {
          this.logger.warn('Some abnormal happened in backend server');
        }
      });
    } else {
      const searchDto = {
        format: 'eBook',
        bookType: 'Online',
        category: categoryInput,
        bookTitle: '',
        author: '',
        publishYear: '',
      }
      this.bookService.findBookList(searchDto).subscribe((data) => {
        if (data && data.length > 0) {
          this.ebookList = data;
          this.logger.info('Success got eBook list from server');
        } else if (data && data.length == 0) {
          this.ebookList = [];
          this.logger.info(`Can not find any eBook within ${categoryInput}`);
        } else {
          this.logger.warn('Some abnormal happened in backend server');
        }
      });
    }
  }

  searchBookList() {
    const searchInfo: SearchBookDto = this.searchForm.value;
    if (searchInfo.category !== '' || searchInfo.author !== '' || searchInfo.bookTitle !== '' || searchInfo.publishYear !== '') {
      this.bookService.findBookList(searchInfo).subscribe((data) => {
        if (data && data.length > 0) {
          this.ebookList = data;
          this.logger.info('Success got eBook list from server');
        } else if (data && data.length == 0) {
          this.ebookList = [];
          this.logger.info(`Can not find any eBook with search conditions`);
        } else {
          this.logger.warn('Some abnormal happened in backend server');
        }
      });
    } else {
      window.alert('No search input, please input your search conditions');
      this.logger.warn('No search input, did not trigger search yet');
    }
  }

  clickHome() {
    if (this.listName !== 'catBook') this.listName = 'catBook';
    const allLink = document.getElementById('allLink') as HTMLButtonElement;
    allLink.click();
    if (!this.listBlock) this.listBlock = true;
  }

  clickSearch() {
    if (this.listName !== 'searchBook') this.listName = 'searchBook';
    const searchInfo: SearchBookDto = this.searchForm.value;
    if (searchInfo.category == '' && searchInfo.author == '' && searchInfo.bookTitle == '' && searchInfo.publishYear == '') {
      this.ebookList = [];
    } else {
      const searchButton = document.querySelector('button.book-search') as HTMLButtonElement;
      searchButton.click();
    }
    if (!this.listBlock) this.listBlock = true;
  }

  clickWish() {
    if (this.listBlock) this.listBlock = false;
    this.updateWishList();
  }

  updateWishList() {
    const wishListDiv = document.querySelector('div.wish-list');
    const getWishListDto = { format: 'eBook', readerName: this.readerName }
    //Delete all ild wishes in list
    while (wishListDiv.firstChild) {
      wishListDiv.removeChild(wishListDiv.firstChild);
    }
    //Add wishlist based on server data
    this.bookService.getWishList(getWishListDto).subscribe((wishList: BookWish[]) => {
      if (wishList && wishList.length > 0) {
        for (const item of wishList) {
          const div1 = document.createElement('div');
          div1.className = 'col-md-2';
          wishListDiv.appendChild(div1);
          const p1 = document.createElement('p');
          const createTime = this.datePipe.transform(item.createTime, 'short');
          p1.innerHTML = createTime;
          div1.appendChild(p1);
          const div2 = document.createElement('div');
          div2.className = 'col-md-2';
          wishListDiv.appendChild(div2);
          const p2 = document.createElement('p');
          p2.innerHTML = item.bookTitle;
          div2.appendChild(p2);
          const div3 = document.createElement('div');
          div3.className = 'col-md-2';
          wishListDiv.appendChild(div3);
          const p3 = document.createElement('p');
          p3.innerHTML = item.language;
          div3.appendChild(p3);
          const div4 = document.createElement('div');
          div4.className = 'col-md-2';
          wishListDiv.appendChild(div4);
          const p4 = document.createElement('p');
          p4.innerHTML = item.status;
          div4.appendChild(p4);
          const div5 = document.createElement('div');
          div5.className = 'col-md-4 text-center';
          wishListDiv.appendChild(div5);
          const delBut = document.createElement('button');
          delBut.className = 'del-wish btn btn-link';
          delBut.innerHTML = 'Delete';
          delBut.style.marginTop = '-10px';
          delBut.addEventListener('click', this.delWish.bind(this, item._id));
          div5.appendChild(delBut);
        }
      } else if (wishList && wishList.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.innerHTML = "You haven't submitted any wish yet!";
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.fontSize = 'x-large';
        emptyMessage.style.color = 'gray';
        emptyMessage.style.marginTop = '50px';
        wishListDiv.appendChild(emptyMessage);
      }
    })
  }

  createWish() {
    const wishVal: CreateWishDto = this.wishForm.value;
    if (wishVal.bookTitle !== '') {
      const searchDto = {
        format: 'eBook',
        category: '',
        bookTitle: wishVal.bookTitle.trim(),
        author: '',
        publishYear: '',
      }
      this.bookService.findBookList(searchDto).subscribe((bookList: Book[]) => {
        if (bookList && bookList.length > 0) {
          window.alert(`Book ${wishVal.bookTitle} already exists, you can find it in eBook category - ${bookList[0].category}`);
        } else if (bookList && bookList.length == 0) {
          this.bookService.createWish(wishVal).subscribe((wish: BookWish) => {
            if (wish && wish.bookTitle) {
              this.logger.info('Success created wish');
              this.updateWishList();
            }
          })
        }
      })
    }
  }

  delWish(wishID: string) {
    if (window.confirm('Please confirm if you want to delete this wish')) {
      this.bookService.delWish(wishID).subscribe((id) => {
        if (id == wishID) {
          this.logger.info('Success delete the wish');
          this.updateWishList();
        }
      })
    }
  }

  ngOnDestroy() {
    const delLinks = document.querySelectorAll('button.del-wish');
    if (delLinks && delLinks.length > 0) {
      for (let i = 0; i < delLinks.length; i++) {
        delLinks[i].replaceWith(delLinks[i].cloneNode(true));
      }
    }
    this.logger.info('Success cleaned all added eventListeners');
  }
}
