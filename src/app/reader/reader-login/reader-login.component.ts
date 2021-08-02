import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { ReaderAuthService } from '../../auth/reader-auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { AccessToken } from '../../common/reader.dto';
import { CommonService } from '../../common/common.service';


@Component({
  selector: 'app-reader-login',
  templateUrl: './reader-login.component.html',
  styleUrls: ['./reader-login.component.css']
})
export class ReaderLoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readerAuthService: ReaderAuthService,
    private tokenStorageService: TokenStorageService,
    private commonService: CommonService,
    private logger: NGXLogger,
  ) { }

  readerLoginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
  }

  readerLogin() {
    const val = this.readerLoginForm.value;
    if (val.username && val.password) {
      this.readerAuthService.signIn(val.username, val.password)
        .subscribe((data: AccessToken) => {
          const access_token = data.token_info ? data.token_info : '';
          if (access_token) {
            this.logger.info(`${val.username} success logged in.`);
            this.tokenStorageService.saveToken(data, val.username);
            this.commonService.setSubject(val.username);
            if (this.readerAuthService.redirectUrl) {
              this.logger.info(`${val.username} now is redirected to url before redirecting to login.`);
              this.router.navigateByUrl(this.readerAuthService.redirectUrl);
            } else {
              this.logger.info(`${val.username} now is redirected to signed reader portal`);
              const readerID = this.readerAuthService.getReaderID();
              this.router.navigateByUrl(`/reader/${readerID}`);
            }
          } else {
            this.logger.warn('${val.username} Login failed.');
          };
        });
    }
  }

  //get username() {return this.loginForm.get('username')}

}
