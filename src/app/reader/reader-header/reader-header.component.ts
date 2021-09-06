import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-reader-header',
  templateUrl: './reader-header.component.html',
  styleUrls: ['./reader-header.component.css']
})
export class ReaderHeaderComponent implements OnInit {

  titleName: string = 'Anlu BiBlio';
  userName: string = 'Our Guest';
  isSignedIn: boolean = false;
  profileUrl: string = '#';
  favorBookUrl: string = '#';

  constructor(
    private commonService: CommonService,
    private readerAuthService: ReaderAuthService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  searchForm = this.fb.group({
    searchValue: [''],
  })

  ngOnInit(): void {
    this.commonService.usernameUpdate.subscribe((username) => {
      this.userName = username;
    })
    if (!this.userName) { this.userName = 'Our Guest' }
    this.isSignedIn = this.readerAuthService.isLoggedIn();
    if (this.isSignedIn) {
      const readerID = this.readerAuthService.getReaderID();
      this.profileUrl = `/reader/profile/${readerID}`;
      this.favorBookUrl = `/reader/favorbook/${readerID}`;
    }
  }

  searchBook() {
    const val = this.searchForm.value;
    if (val.searchValue.trim() !== '') {
      this.router.navigateByUrl(`/book/reader/search?sval=${val.searchValue.trim()}`);
    }
  }

}
