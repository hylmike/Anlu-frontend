import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { ReaderService } from '../reader.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css'],
})
export class ForgotPwdComponent implements OnInit {
  constructor(
    private logger: NGXLogger,
    private router: Router,
    private fb: FormBuilder,
    private readerService: ReaderService,
    public translate: TranslateService
  ) {}

  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {}

  submitEmail() {
    let notice1: string, notice2: string;
    this.translate
      .stream(['forgotPwd.notice-1', 'forgotPwd.notice-2'])
      .subscribe((res) => {
        notice1 = res['forgotPwd.notice-1'];
        notice2 = res['forgotPwd.notice-2'];
      });
    const val = this.emailForm.value;
    this.readerService.verifyEmail(val).subscribe((data) => {
      if (data) {
        this.logger.info(`Email validation success for reader ${data}`);
        this.readerService.sendResetEmail(val).subscribe((data) => {
          if (data) {
            window.alert(notice1);
            this.router.navigateByUrl('/reader/login');
          }
        });
      } else {
        this.logger.warn('Email validation failed');
        window.alert(notice2);
        this.emailForm.setValue({ email: '' });
      }
    });
  }
}
