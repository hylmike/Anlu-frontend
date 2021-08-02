import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from '../../common/common.service';
import { NGXLogger } from 'ngx-logger';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';

@Component({
  selector: 'app-reader-signed',
  templateUrl: './reader-signed.component.html',
  styleUrls: ['./reader-signed.component.css']
})
export class ReaderSignedComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private storageService: TokenStorageService,
    private logger: NGXLogger,
    private router: Router,
    private readerAuthService: ReaderAuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const readerID = this.readerAuthService.getReaderID();
    const idFromUrl = this.route.snapshot.paramMap.get('id');
    if (readerID === idFromUrl) {
      const readerName = this.storageService.getUsername();
      this.commonService.setSubject(readerName);
      this.logger.info(`Success load signed portal page for reader ${readerName}`);
    } else {
      this.router.navigateByUrl('/**');
    }

  }

  readBook(bookID: string, currentPage: number) {
    this.router.navigateByUrl(`/book/read/${bookID}/${currentPage}`);
  }

}
