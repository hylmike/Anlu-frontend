import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

import { CommonService } from '../../common/common.service';
import { LibrarianAuthService } from '../../auth/librarian-auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  titleName : string;
  adminName : string;

  constructor(
    private commonService: CommonService,
    private logger: NGXLogger,
    private libAuthService: LibrarianAuthService,
    private tokenService: TokenStorageService,
    private fb: FormBuilder,
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
      this.adminName = username;
    });
    if (!this.adminName) {
      this.translate.stream('adminHeader.defaultName').subscribe((res:string)=>{
        this.adminName = res;
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
        this.logger.info(`Current admin ${data} has logged out.`);
        this.router.navigateByUrl('/lib/login');
      } else {
        this.logger.warn(`Something happen in server, admin logout failed`);
        window.alert(failMessage);
      }
    });
  }

  searchBook() {
    const val = this.searchForm.value;
    if (val.searchValue.trim() !== '') {
      this.router.navigateByUrl(`/book/admin/search?sval=${val.searchValue.trim()}`);
    }
  }

}
