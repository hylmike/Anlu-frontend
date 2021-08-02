import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LibrarianAuthService } from '../../auth/librarian-auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { AccessToken } from '../../common/lib.dto';
import { CommonService } from '../../common/common.service';
import { AdminAuthService } from '../../auth/admin-auth.service';

@Component({
  selector: 'app-librarian-login',
  templateUrl: './librarian-login.component.html',
  styleUrls: ['./librarian-login.component.css']
})
export class LibrarianLoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private libAuthService: LibrarianAuthService,
    private adminAuthService: AdminAuthService,
    private tokenStorageService: TokenStorageService,
    private commonService: CommonService,
  ) { }

  libLoginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: ['Librarian', Validators.required],
  })

  ngOnInit(): void {
  }

  libLogin() {
    const val = this.libLoginForm.value;
    if (val.username && val.password) {
      if (val.role === 'Librarian') {
        this.libAuthService.signIn(val.username, val.password)
          .subscribe((data: AccessToken) => {
            const access_token = data.token_info ? data.token_info : '';
            if (access_token) {
              console.log(`${val.username} is logged in.`);
              this.tokenStorageService.saveToken(data, `$L_${val.username}`);
              this.commonService.setSubject(val.username);
              this.configLogin()
            } else {
              console.log('Librarian login failed.');
            }
          })
      } else if (val.role === 'Admin') {
        this.adminAuthService.signIn(val.username, val.password)
          .subscribe((data: AccessToken) => {
            const access_token = data.token_info ? data.token_info : '';
            if (access_token) {
              console.log(`${val.username} is logged in.`);
              this.tokenStorageService.saveToken(data, `$A_${val.username}`);
              this.commonService.setSubject(val.username);
              this.configLogin()
            } else {
              console.log('Admin login failed.');
            }
          })
      }
    }
  }

  configLogin() {
    const val = this.libLoginForm.value;
    this.router.navigateByUrl('/');
    const loginLink = document.querySelector('#link_signin');
    const logoutLink = document.querySelector('#link_signout');
    if (loginLink && logoutLink) {
      loginLink.className = 'nav-link disabled';
      logoutLink.className = 'dropdown-item';
    }
    if (val.role === 'Librarian') {
      if (this.libAuthService.redirectUrl) {
        this.router.navigateByUrl(this.libAuthService.redirectUrl);
      } else {
        if (this.adminAuthService.redirectUrl) {
          this.router.navigateByUrl(this.libAuthService.redirectUrl);
        }
      }
    }
  }
}
