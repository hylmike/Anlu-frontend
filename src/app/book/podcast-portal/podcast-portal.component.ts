import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Book, SearchBookDto } from 'src/app/common/book-dto';
import { CommonService } from 'src/app/common/common.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-podcast-portal',
  templateUrl: './podcast-portal.component.html',
  styleUrls: ['./podcast-portal.component.css']
})
export class PodcastPortalComponent implements OnInit, AfterViewInit {

  podcastList: Book[];
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
    format: ['Podcast'],
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

  ngAfterViewInit() {
    const navPodcast = document.getElementById('nav-podcast');
    const navHome = document.getElementById('nav-myLibrary')
    if (!navPodcast.className.includes('active')) {
      navPodcast.className += ' active';
      navHome.className = navHome.className.slice(0,-7);
    }
  }

  setBookList(categoryInput: string) {
    if (categoryInput === 'All') {
      this.bookService.findAllBook('Podcast').subscribe((bookList: []) => {
        if (bookList && bookList.length > 0) {
          this.podcastList = bookList;
          this.logger.info('Succes load all podcast list');
        } else if (bookList && bookList.length == 0) {
          this.podcastList = [];
          this.logger.info('No podcast in searchListbase');
        } else {
          this.logger.warn('Some abnormal happened in backend server');
        }
      });
    } else {
      const searchDto = {
        format: 'Podcast',
        category: categoryInput,
        bookTitle: '',
        author: '',
        publishYear: '',
      }
      this.bookService.findBookList(searchDto).subscribe((searchList) => {
        if (searchList && searchList.length > 0) {
          this.podcastList = searchList;
          this.logger.info('Success got podcast list from server');
        } else if (searchList && searchList.length == 0) {
          this.podcastList = [];
          this.logger.info(`Can not find any podcast within ${categoryInput}`);
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
          this.podcastList = searchList;
          this.logger.info('Success got podcast list from server');
        } else if (searchList && searchList.length == 0) {
          this.podcastList = [];
          this.logger.info(`Can not find any podcast with search conditions`);
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
      this.podcastList = [];
    } else {
      const searchButton = document.querySelector('button.book-search') as HTMLButtonElement;
      searchButton.click();
    }
  }

}
