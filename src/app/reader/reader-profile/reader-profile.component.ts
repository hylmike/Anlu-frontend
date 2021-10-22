import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { Reader } from '../../common/reader.dto';
import { CommonService } from 'src/app/common/common.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AdminAuthService } from 'src/app/auth/admin-auth.service';

@Component({
  selector: 'app-reader-profile',
  templateUrl: './reader-profile.component.html',
  styleUrls: ['./reader-profile.component.css']
})
export class ReaderProfileComponent implements OnInit {

  reader: Reader;
  isAdmin: boolean = false;

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService,
    private adminAuthService: AdminAuthService,
    private readerAuthService: ReaderAuthService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    //Check if user is admin, set username for header
    let username = this.tokenService.getUsername();
    if (this.adminAuthService.isLoggedIn()) {
      this.isAdmin = true;
      username = username.slice(3,);
    }
    this.commonService.setSubject(username);
    //Get reader info from backend
    const readerID = this.route.snapshot.paramMap.get('id');
    this.readerAuthService.getReader(readerID).subscribe((data) => {
      if (data && data._id) {
        this.reader = data;
        this.logger.info(`Success get reader ${readerID} profile from backend`);
      }
      else {
        this.logger.warn(`Get reader ${readerID} from backend failed`);
      }
    })
  }

}
