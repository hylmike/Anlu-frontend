import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { Book, SearchBookDto } from '../../common/book-dto';
import { BookService } from '../book.service';

@Component({
  selector: 'app-ebook-portal',
  templateUrl: './ebook-portal.component.html',
  styleUrls: ['./ebook-portal.component.css']
})
export class EbookPortalComponent implements OnInit {

  ebookList: Book[];

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private router: Router,
    private bookService: BookService,
  ) { }

  searchForm = this.fb.group({
    format: ['eBook'],
    category: [''],
    bookTitle: [''],
    author: [''],
    publishYear: [''],
  })

  ngOnInit(): void {
    const allLink = document.getElementById('allLink') as HTMLButtonElement;
    //allLink.click();
  }

  setBookList(categoryInput: string) {
    if (categoryInput === 'All') {
      this.bookService.findAllBook('eBook').subscribe((data: []) => {
        if (data && data.length > 0) {
          this.ebookList = data;
        } else if (data && data.length == 0) {
          this.logger.info('No eBook in database');
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
      this.bookService.findBookList(searchDto).subscribe((data) => {
        if (data && data.length > 0) {
          this.ebookList = data;
          this.logger.info('Success got eBook list from server');
        } else if (data && data.length == 0) {
          this.logger.info(`Can not find any eBook within ${categoryInput}`);
        } else {
          this.logger.warn('Some abnormal happened in backend server');
        }
      });
    }
  }

  searchBookList() {
    const searchInfo: SearchBookDto = this.searchForm.value;
    if (searchInfo.category !== '' || searchInfo.author !== '' || searchInfo.bookTitle !== '') {
      this.bookService.findBookList(searchInfo).subscribe((data) => {
        if (data && data.length > 0) {
          this.ebookList = data;
          this.logger.info('Success got eBook list from server');
        } else if (data && data.length == 0) {
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

}
