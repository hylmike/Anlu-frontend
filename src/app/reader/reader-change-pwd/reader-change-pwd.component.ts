import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { ChangePwdDto } from 'src/app/common/reader.dto';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-reader-change-pwd',
  templateUrl: './reader-change-pwd.component.html',
  styleUrls: ['./reader-change-pwd.component.css']
})
export class ReaderChangePwdComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readerAuthService: ReaderAuthService,
    private tokenService: TokenStorageService,
    private logger: NGXLogger,
  ) { }

  changePwdForm = this.fb.group({
    username: [this.tokenService.getUsername()],
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  })

  ngOnInit(): void {}

  changePwd() {
    const val: ChangePwdDto = this.changePwdForm.value;
    this.readerAuthService.changePwd(val).subscribe((data)=>{
      if (data === val.username) {
        this.logger.info(`Success changed password for ${val.username}`)
        this.router.navigateByUrl('reader/login');
      } else {
        this.logger.warn(`Change password for ${val.username} failed`);
        window.alert(`Changing password failed, try again later`)
      }
    });
  }

  cancel() {
    const readerID = this.readerAuthService.getReaderID();
    this.logger.info(`Reader ${readerID} cancelled password change`);
    this.router.navigateByUrl(`reader/${readerID}/profile`);
  }

}
