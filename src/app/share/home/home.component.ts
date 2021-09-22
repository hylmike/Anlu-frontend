import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../../auth/token-storage.service';
import { ReaderAuthService } from '../../auth/reader-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private readerAuthService: ReaderAuthService,
  ) { }

  ngOnInit(): void {
    const loginLink = document.querySelector("#link_signin");
    const logoutLink = document.querySelector("#link_signout")
    if (loginLink && logoutLink) {
      if (this.readerAuthService.isLoggedIn()) {
        loginLink.className = 'nav-link disabled';
        logoutLink.className = 'dropdown-item';
      } else {
        loginLink.className = 'nav-link';
        logoutLink.className = 'dropdown-item disabled';
      }
    }
  }
}
