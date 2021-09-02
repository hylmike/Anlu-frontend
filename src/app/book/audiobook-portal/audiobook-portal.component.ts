import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormBuilder } from '@angular/forms';
import { Book, SearchBookDto } from 'src/app/common/book-dto';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-audiobook-portal',
  templateUrl: './audiobook-portal.component.html',
  styleUrls: ['./audiobook-portal.component.css']
})
export class AudiobookPortalComponent implements OnInit {

  audiobookList: Book[];
  role: string = 'reader';
  listName = 'catBook';

  constructor(
    private fb: FormBuilder,
    private logger: NGXLogger,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    private bookService: BookService,
  ) { }

  searchForm = this.fb.group({
    format: ['Audiobook'],
    category: [''],
    bookTitle: [''],
    author: [''],
    publishYear: [''],
  })

  ngOnInit(): void {
    this.commonService.setSubject(this.tokenService.getUsername());
    const allLink = document.getElementById('allLink') as HTMLButtonElement;
    allLink.click();
  }

  setBookList(categoryInput: string) {
    if (categoryInput === 'All') {
      this.bookService.findAllBook('Audiobook').subscribe((bookList: []) => {
        if (bookList && bookList.length > 0) {
          this.audiobookList = bookList;
          this.logger.info('Succes load all Audiobook list');
        } else if (bookList && bookList.length == 0) {
          this.audiobookList = [];
          this.logger.info('No Audiobook in searchListbase');
        } else {
          this.logger.warn('Some abnormal happened in backend server');
        }
      });
    } else {
      const searchDto = {
        format: 'eBook',
        category: categoryInput,
        bookTitle: '',
        author: '',
        publishYear: '',
      }
      this.bookService.findBookList(searchDto).subscribe((searchList) => {
        if (searchList && searchList.length > 0) {
          this.audiobookList = searchList;
          this.logger.info('Success got Audiobook list from server');
        } else if (searchList && searchList.length == 0) {
          this.audiobookList = [];
          this.logger.info(`Can not find any Audiobook within ${categoryInput}`);
        } else {
          this.logger.warn('Some abnormal happened in backend server');
        }
      });
    }
  }

  searchBookList() {
    const searchInfo: SearchBookDto = this.searchForm.value;
    if (searchInfo.category !== '' || searchInfo.author !== '' || searchInfo.bookTitle !== '' || searchInfo.publishYear !== '') {
      this.bookService.findBookList(searchInfo).subscribe((searchList) => {
        if (searchList && searchList.length > 0) {
          this.audiobookList = searchList;
          this.logger.info('Success got Audiobook list from server');
        } else if (searchList && searchList.length == 0) {
          this.audiobookList = [];
          this.logger.info(`Can not find any Audiobook with search conditions`);
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
    if (this.listName!=='catBook') this.listName = 'catBook';
    const allLink = document.getElementById('allLink') as HTMLButtonElement;
    allLink.click();
  }

  clickSearch() {
    if (this.listName!=='searchBook') this.listName = 'searchBook';
    const searchInfo: SearchBookDto = this.searchForm.value;
    if (searchInfo.category == '' && searchInfo.author == '' && searchInfo.bookTitle == '' && searchInfo.publishYear == '') {
      this.audiobookList = [];
    } else {
      const searchButton = document.querySelector('button.book-search') as HTMLButtonElement;
      searchButton.click();
    }
  }

}
