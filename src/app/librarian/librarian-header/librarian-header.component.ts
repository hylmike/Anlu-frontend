import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

import { CommonService } from 'src/app/common/common.service';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-librarian-header',
  templateUrl: './librarian-header.component.html',
  styleUrls: ['./librarian-header.component.css']
})
export class LibrarianHeaderComponent implements OnInit {

  titleName: string;
  libName: string;

  constructor(
    private commonService: CommonService,
    private tokenService: TokenStorageService,
    private libAuthService: LibrarianAuthService,
    private fb: FormBuilder,
    private logger: NGXLogger,
    private router: Router,
    public translate: TranslateService,
  ) { }

  searchForm = this.fb.group({
    searchValue: [''],
  })

  ngOnInit(): void {
    this.translate.stream('readerHeader.titleName').subscribe((res: string) => {
      this.titleName = res;
    });
    this.commonService.usernameUpdate.subscribe((username) => {
      this.libName = username;
    });
    if (!this.libName) {
      this.translate.stream('libHeader.defaultName').subscribe((res:string)=>{
        this.libName = res;
      })
    }
  }

  logout() {
    const libID = this.libAuthService.getLibID();
    let failMessage: string;
    this.translate.stream('adminHeader.logoutFail').subscribe((res)=>{
      failMessage = res;
    })
    this.libAuthService.signOut().subscribe((data) => {
      if (data == libID) {
        this.tokenService.clearToken();
        this.logger.info(`Current librarian ${data} has logged out.`);
        this.router.navigateByUrl('/lib/login');
      } else {
        this.logger.warn(`Something happen in server, librarian logout failed`);
        window.alert(failMessage);
      }
    });
  }

  searchBook() {
    const val = this.searchForm.value;
    if (val.searchValue.trim() !== '') {
      this.router.navigateByUrl(`/book/librarian/search?sval=${val.searchValue.trim()}`);
    }
  }

}
