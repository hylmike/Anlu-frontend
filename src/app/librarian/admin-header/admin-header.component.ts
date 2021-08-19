import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

import { CommonService } from '../../common/common.service';
import { LibrarianAuthService } from '../../auth/librarian-auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  titleName = 'Anlu Biblio';

  adminName = 'Admin';

  constructor(
    private commonService: CommonService,
    private logger: NGXLogger,
    private libAuthService: LibrarianAuthService,
    private tokenService: TokenStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.commonService.usernameUpdate.subscribe((username) => {
      this.adminName = username;
    });
  }

  logout() {
    const libID = this.libAuthService.getLibID();
    this.libAuthService.signOut().subscribe((data) => {
      if (data == libID) {
        this.tokenService.clearToken();
        this.logger.info(`Current admin ${data} has logged out.`);
        this.router.navigateByUrl('/lib/login');
      } else {
        this.logger.warn(`Something happen in server, admin logout failed`);
        window.alert('Logout failed, please try again later');
      }
    });
  }

}
