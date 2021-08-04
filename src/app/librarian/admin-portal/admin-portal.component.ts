import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private tokenService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    const adminName = this.tokenService.getUsername().slice(3,);
    if (adminName) {
      this.commonService.setSubject(adminName);
    }
  }

}
