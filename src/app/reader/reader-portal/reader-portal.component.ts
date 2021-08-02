import { Component, OnInit } from '@angular/core';
import { ReaderAuthService } from '../../auth/reader-auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-reader-portal',
  templateUrl: './reader-portal.component.html',
  styleUrls: ['./reader-portal.component.css']
})
export class ReaderPortalComponent implements OnInit {

  constructor(
    private readerAuthService: ReaderAuthService,
    private tokenService: TokenStorageService,
    private logger: NGXLogger,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.readerAuthService.isLoggedIn()) {
      const readerID = this.readerAuthService.getReaderID();
      this.router.navigateByUrl(`/reader/${readerID}`);
    } else {
      this.logger.info('Success load reader portal for un-signed reader');
    }
  }

}
