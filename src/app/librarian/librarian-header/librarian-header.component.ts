import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

import { CommonService } from 'src/app/common/common.service';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-librarian-header',
  templateUrl: './librarian-header.component.html',
  styleUrls: ['./librarian-header.component.css']
})
export class LibrarianHeaderComponent implements OnInit {

  titleName: string = 'Anlu Biblio';

  libName: string = 'Librarian';

  constructor(
    private commonService: CommonService,
    private tokenService: TokenStorageService,
    private libAuthService: LibrarianAuthService,
    private logger: NGXLogger,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.commonService.usernameUpdate.subscribe((username) => {
      this.libName = username;
    });
  }

  logout() {
    const libID = this.libAuthService.getLibID();
    this.libAuthService.signOut().subscribe((data) => {
      if (data == libID) {
        this.tokenService.clearToken();
        this.logger.info(`Current librarian ${data} has logged out.`);
        this.router.navigateByUrl('/lib/login');
      } else {
        this.logger.warn(`Something happen in server, librarian logout failed`);
        window.alert('Logout failed, please try again later');
      }
    });
  }

}
