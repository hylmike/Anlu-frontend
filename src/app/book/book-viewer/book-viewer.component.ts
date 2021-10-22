import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import * as pdfjs from 'pdfjs-dist/build/pdf';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { BookService } from '../book.service';
import { Book } from '../../common/book-dto';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';

@Component({
  selector: 'app-book-viewer',
  templateUrl: './book-viewer.component.html',
  styleUrls: ['./book-viewer.component.css'],
})
export class BookViewerComponent implements OnInit, OnDestroy {
  pdfPara = {
    pdf: null,
    currentPage: 1,
    scale: 1,
  };

  readInfo = {
    startTime: new Date(),
    endTime: new Date(),
  };

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private logger: NGXLogger,
    private readerAuthService: ReaderAuthService,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    const bookID = this.route.snapshot.paramMap.get('id');
    this.pdfPara.currentPage = Number(this.route.snapshot.paramMap.get('num'));
    let book: Book;
    this.bookService.getBook(bookID).subscribe(async (ebook) => {
      if (ebook) {
        book = ebook;
        //This link is just for unit testing purpose
        //const urlLink = '/bookfile/Pro HTML5 Programming.pdf'
        const urlLink = book.bookFile.slice(2);
        pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.js';
        const pdfLoader = pdfjs.getDocument(urlLink);
        this.pdfPara.pdf = await pdfLoader.promise;
        document.querySelector('#total-pages').textContent =
          this.pdfPara.pdf._pdfInfo.numPages;
        this.render();
        this.readInfo.startTime = new Date();
      } else {
        this.logger.warn(`Book ${bookID} does not exist`);
      }
    });
  }

  async render() {
    //Load information from current page
    const page = await this.pdfPara.pdf.getPage(this.pdfPara.currentPage);
    const autoscale = document.getElementById('autoscale') as HTMLInputElement;
    let viewport = page.getViewport({ scale: this.pdfPara.scale });
    //For autoscale checked, set the default viewport with scale=1
    if (autoscale.checked === true) {
      viewport = page.getViewport({ scale: 1 });
    }
    //Apply page dimension to Canvas element

    const container = document.getElementById('canvas-container') as HTMLDivElement;
    const canvas = document.getElementById('pdf-content') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    //if set to autoscale, calculate the responsive view width and update viewport
    if (autoscale.checked === true) {
      this.pdfPara.scale = container.clientWidth*0.8 / viewport.width;
      viewport = page.getViewport({ scale: this.pdfPara.scale });
    }
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    //Render the page into Canvas element
    const renderContext = {
      canvasContext: ctx,
      background: 'rgba(255,255,255,1)',
      viewport: viewport,
    };
    await page.render(renderContext);
    document.documentElement.scrollTop = 0;
    this.logger.info('PDF page rendered.');
  }

  goPreviousClick() {
    if (this.pdfPara.pdf === null || this.pdfPara.currentPage === 1) {
      return;
    }
    this.pdfPara.currentPage--;
    //document.getElementById('current-page').value = this.pdfPara.currentPage;
    this.render();
  }

  goNextClick() {
    if (
      this.pdfPara.pdf === null ||
      this.pdfPara.currentPage >= this.pdfPara.pdf._pdfInfo.numPages
    ) {
      return;
    }
    this.pdfPara.currentPage++;
    //document.getElementById('current-page').value = this.pdfPara.currentPage;
    this.render();
  }

  currentPageInput(event: Event) {
    if (this.pdfPara.pdf === null) return;
    const targetPage = Number((event.target as HTMLInputElement).value);
    if (targetPage >= 1 && targetPage <= this.pdfPara.pdf._pdfInfo.numPages) {
      this.pdfPara.currentPage = targetPage;
    }
    this.render();
  }

  zoomInClick() {
    if (this.pdfPara.pdf === null) return;
    //Enlarge page 30%
    this.pdfPara.scale += 0.3;
    this.render();
  }

  zoomOutClick() {
    if (this.pdfPara.pdf === null) return;
    //Shrink page 30%
    this.pdfPara.scale -= 0.3;
    this.render();
  }

  autoscaleClick() {
    const autoscale = document.getElementById('autoscale') as HTMLInputElement;
    const zoomInButton = document.getElementById(
      'zoom-in'
    ) as HTMLButtonElement;
    const zoomOutButton = document.getElementById(
      'zoom-out'
    ) as HTMLButtonElement;
    if (autoscale.checked === true) {
      zoomInButton.disabled = true;
      zoomOutButton.disabled = true;
      this.render();
      return;
    }
    zoomInButton.disabled = false;
    zoomOutButton.disabled = false;
  }

  onResize() {
    const autoscale = document.getElementById('autoscale') as HTMLInputElement;
    if (autoscale.checked === true) {
      this.render();
    }
  }

  returnPortal() {
    this.router.navigateByUrl('/ebook');
  }

  ngOnDestroy() {
    this.readInfo.endTime = new Date();
    const readTime =
      (this.readInfo.endTime.valueOf() - this.readInfo.startTime.valueOf()) /
      1000;
    window.alert('ReaderTime is ' + readTime + 's');  
    const bookID = this.route.snapshot.paramMap.get('id');
    const readerID = this.readerAuthService.getReaderID();
    const readRecord = {
      bookID: bookID,
      readerID: readerID,
      startTime: this.readInfo.startTime,
      currentPage: this.pdfPara.currentPage,
      duration: readTime,
    };
    console.log('Reader record is :' + readRecord )
    this.bookService.addReadRecord(readRecord).subscribe((record) => {
      if (record) {
        console.log('Return read record is: ' + record);
        this.logger.info(`Success update read record for book ${bookID}`);
      } else {
        this.logger.warn(
          `Can't find book ${bookID} or read record already exist`
        );
      }
    });
  }
}
