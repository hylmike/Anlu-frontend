import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-reader-header',
  templateUrl: './reader-header.component.html',
  styleUrls: ['./reader-header.component.css'],
})
export class ReaderHeaderComponent implements OnInit {
  titleName: string;
  userName: string;
  isSignedIn: boolean = false;
  profileUrl: string = '#';
  favorBookUrl: string = '#';

  constructor(
    private commonService: CommonService,
    private readerAuthService: ReaderAuthService,
    private fb: FormBuilder,
    private router: Router,
    public translate: TranslateService
  ) {}

  searchForm = this.fb.group({
    searchValue: [''],
  });

  ngOnInit(): void {
    this.translate.stream('readerHeader.titleName').subscribe((res: string) => {
      this.titleName = res;
    });
    this.isSignedIn = this.readerAuthService.isLoggedIn();
    if (this.isSignedIn) {
      this.commonService.usernameUpdate.subscribe((username) => {
        this.userName = username;
      });
      const readerID = this.readerAuthService.getReaderID();
      this.profileUrl = `/reader/profile/${readerID}`;
      this.favorBookUrl = `/reader/favorbook/${readerID}`;
    }
    if (!this.userName) {
      this.translate.stream('readerHeader.defaultName').subscribe((res:string)=>{
        this.userName = res;
      })
    }
  }

  searchBook() {
    const val = this.searchForm.value;
    if (val.searchValue.trim() !== '') {
      this.router.navigateByUrl(
        `/book/reader/search?sval=${val.searchValue.trim()}`
      );
    }
  }
}
