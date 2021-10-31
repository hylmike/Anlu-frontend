import { Component, OnDestroy, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from '../book.service';
import { Book } from 'src/app/common/book-dto';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-audiobook-play',
  templateUrl: './audiobook-play.component.html',
  styleUrls: ['./audiobook-play.component.css']
})
export class AudiobookPlayComponent implements OnInit, OnDestroy {
  audioBook: Book;

  readInfo = {
    startPlayTime: 0,
    endPlayTime: 0,
    startTime: new Date(),
  }

  constructor(
    private logger: NGXLogger,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private readerAuthService: ReaderAuthService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const bookID = this.route.snapshot.paramMap.get('id');
    const currentTime = Number(this.route.snapshot.paramMap.get('time'));
    this.readInfo.startPlayTime = currentTime;
    this.readInfo.startTime = new Date();
    this.bookService.getBook(bookID).subscribe((data: Book) => {
      if (data && data.format === 'Audiobook') {
        this.audioBook = data;
        this.audioBook.coverPic = this.audioBook.coverPic.slice(2,);
        this.audioBook.bookFile = this.audioBook.bookFile.slice(2,);
        const bookAudio = document.getElementById('book-audio') as HTMLAudioElement;
        bookAudio.currentTime = currentTime;
      } else if (data && data.format === 'Podcast') {
        this.audioBook = data;
        this.audioBook.coverPic = this.audioBook.coverPic.slice(2,);
        this.audioBook.bookFile = this.audioBook.bookFile.slice(2,);
        const bookAudio = document.getElementById('book-audio') as HTMLAudioElement;
        bookAudio.currentTime = currentTime;
      } else {
        this.logger.warn(`Can not find audiobook/podcast ${bookID} from server`);
      }
    });
  }

  returnProfile() {
    const bookID = this.route.snapshot.paramMap.get('id');
    this.router.navigateByUrl(`/book/profile/${bookID}`);
  }

  ngOnDestroy() {
    const bookAudio = document.getElementById('book-audio') as HTMLAudioElement;
    this.readInfo.endPlayTime = bookAudio.currentTime;
    const readTime = this.readInfo.endPlayTime - this.readInfo.startPlayTime;
    const bookID = this.route.snapshot.paramMap.get('id');
    const readerID = this.readerAuthService.getReaderID();
    const readRecord = {
      bookID: bookID,
      readerID: readerID,
      startTime: this.readInfo.startTime,
      currentPage: bookAudio.currentTime,
      duration: readTime,
    }
    this.bookService.addReadRecord(readRecord).subscribe((record)=>{
      if (record) {
        this.logger.info(`Success update read record for book ${bookID}`);
      } else {
        this.logger.warn(`Can't find book ${bookID} or read record already exist`);
      }
    });
  }

}
