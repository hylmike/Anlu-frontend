import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ReaderAuthService } from '../../auth/reader-auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-workshop-portal',
  templateUrl: './workshop-portal.component.html',
  styleUrls: ['./workshop-portal.component.css']
})
export class WorkshopPortalComponent implements OnInit, AfterViewInit {

  readerID = '';

  constructor(
    private readerAuthService: ReaderAuthService,
    private commonService: CommonService,
    private tokenService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    if (this.readerAuthService.isLoggedIn()) {
      //set the reader name in header
      const readerName = this.tokenService.getUsername();
      this.commonService.setSubject(readerName);
      this.readerID = this.readerAuthService.getReaderID();
    }
  }

  ngAfterViewInit() {
    const navWorkshop = document.getElementById('nav-workshop');
    const navHome = document.getElementById('nav-myLibrary')
    if (!navWorkshop.className.includes('active')) {
      navWorkshop.className += ' active';
      navHome.className = navHome.className.slice(0,-7);
    }
  }

}
