import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-librarian-portal',
  templateUrl: './librarian-portal.component.html',
  styleUrls: ['./librarian-portal.component.css']
})
export class LibrarianPortalComponent implements OnInit {

  constructor(
    private tokenService: TokenStorageService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    const libName = this.tokenService.getUsername().slice(3,);
    if (libName) {
      this.commonService.setSubject(libName);
    }
  }

}
