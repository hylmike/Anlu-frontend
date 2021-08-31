import { Component, OnInit } from '@angular/core';
import { ReaderAuthService } from '../../auth/reader-auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';

@Component({
  selector: 'app-reader-portal',
  templateUrl: './reader-portal.component.html',
  styleUrls: ['./reader-portal.component.css']
})
export class ReaderPortalComponent implements OnInit {

  constructor(
    private readerAuthService: ReaderAuthService,
    private libAuthService: LibrarianAuthService,
    private tokenService: TokenStorageService,
    private logger: NGXLogger,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.readerAuthService.isLoggedIn()) {
      const readerID = this.readerAuthService.getReaderID();
      this.router.navigateByUrl(`/reader/signed/${readerID}`);
    } else {
      if (this.libAuthService.isLoggedIn()) {
        this.libAuthService.signOut().subscribe((libID)=>{
          if (libID) {
            this.logger.info('Success remove previous logged lib info');
          } else {
            this.logger.warn('Failed logout of lib in server side');
          }
        })
      }
      this.logger.info('Success load reader portal for un-signed reader');
    }
  }

}
