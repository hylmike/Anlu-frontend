import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { LibrarianAuthService } from '../../auth/librarian-auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { AccessToken } from '../../common/lib.dto';
import { CommonService } from '../../common/common.service';
import { AdminAuthService } from '../../auth/admin-auth.service';

@Component({
  selector: 'app-librarian-login',
  templateUrl: './lib-login.component.html',
  styleUrls: ['./lib-login.component.css']
})
export class LibLoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private libAuthService: LibrarianAuthService,
    private adminAuthService: AdminAuthService,
    private tokenStorageService: TokenStorageService,
    private commonService: CommonService,
    private logger: NGXLogger,
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
            if (data) {
              const access_token = data.token_info ? data.token_info : '';
              this.logger.info(`Librarian ${val.username} success logged in.`);
              this.tokenStorageService.saveToken(data, `$L_${val.username}`);
              this.commonService.setSubject(val.username);
              if (this.libAuthService.redirectUrl) {
                this.router.navigateByUrl(this.libAuthService.redirectUrl);
              } else {
                this.router.navigateByUrl('/lib/lib-portal');
              }
            } else {
              this.logger.warn('Role mismatch, librarian login failed.');
              window.alert(`User does not have librarian authentication, login failed`);
            }
          })
      } else if (val.role === 'Admin') {
        this.adminAuthService.signIn(val.username, val.password)
          .subscribe((data: AccessToken) => {
            if (data) {
              const access_token = data.token_info ? data.token_info : '';
              this.logger.info(`Admin ${val.username} success logged in.`);
              this.tokenStorageService.saveToken(data, `$A_${val.username}`);
              this.commonService.setSubject(val.username);
              if (this.adminAuthService.redirectUrl) {
                this.router.navigateByUrl(this.adminAuthService.redirectUrl);
              } else {
                this.router.navigateByUrl('/lib/admin-portal');
              }
            } else {
              this.logger.warn('Role mismatch, admin login failed.');
              window.alert(`User does not have admin authentication, login failed`);
            }
          })
      }
    }
  }
}
