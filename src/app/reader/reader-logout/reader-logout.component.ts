import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { ReaderAuthService } from '../../auth/reader-auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-reader-logout',
  templateUrl: './reader-logout.component.html',
  styleUrls: ['./reader-logout.component.css']
})
export class ReaderLogoutComponent implements OnInit {

  constructor(
    private readerAuthService: ReaderAuthService,
    private router: Router,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    private logger: NGXLogger,
  ) { }

  ngOnInit(): void {
    this.readerAuthService.signOut().subscribe((data) => {
      if (data) {
        this.tokenService.clearToken();
        this.logger.info('Current user ${data} has logged out.');
        this.commonService.setSubject('Our Guest');
        this.router.navigateByUrl('/reader');
      }
    })
  }

}
