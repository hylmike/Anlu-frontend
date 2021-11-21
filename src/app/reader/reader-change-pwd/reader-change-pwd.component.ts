import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { ChangePwdDto } from 'src/app/common/reader.dto';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reader-change-pwd',
  templateUrl: './reader-change-pwd.component.html',
  styleUrls: ['./reader-change-pwd.component.css'],
})
export class ReaderChangePwdComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readerAuthService: ReaderAuthService,
    private tokenService: TokenStorageService,
    private logger: NGXLogger,
    public translate: TranslateService
  ) {}

  changePwdForm = this.fb.group({
    username: [this.tokenService.getUsername()],
    action: ['Change'],
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.minLength(5)],
    confirmPassword: ['', Validators.minLength(5)],
  });

  ngOnInit(): void {}

  get f() {
    return this.changePwdForm.controls;
  }

  changePwd() {
    let notice1: string, notice2: string;
    this.translate
      .stream(['readerChangePwd.notice-1', 'readerChangePwd.notice-2'])
      .subscribe((res) => {
        notice1 = res['readerChangePwd.notice-1'];
        notice2 = res['readerChangePwd.notice-2'];
      });
    const val: ChangePwdDto = this.changePwdForm.value;
    if (this.f.newPassword.value === this.f.confirmPassword.value) {
      this.readerAuthService.changePwd(val).subscribe((data) => {
        if (data === val.username) {
          this.logger.info(`Success changed password for ${val.username}`);
          this.router.navigateByUrl('reader/login');
        } else {
          this.logger.warn(`Change password for ${val.username} failed`);
          window.alert(notice1);
        }
      });
    } else {
      window.alert(notice2);
    }
  }

  cancel() {
    const readerID = this.readerAuthService.getReaderID();
    this.logger.info(`Reader ${readerID} cancelled password change`);
    this.router.navigateByUrl(`reader/profile/${readerID}`);
  }
}
