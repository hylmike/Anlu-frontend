import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ChangePwdDto, ResetPwdDto } from 'src/app/common/reader.dto';
import { ReaderService } from '../reader.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readerService: ReaderService,
    private logger: NGXLogger,
  ) { }

  resetPwdForm = this.fb.group({
    username: [''],
    token: [''],
    newPassword: ['', Validators.minLength(5)],
    confirmPassword: ['', Validators.minLength(5)],
  })

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('rname');
    const token = this.route.snapshot.paramMap.get('token');
    this.resetPwdForm.setValue({
      username: username,
      token: token,
      newPassword: '',
      confirmPassword: '',
    })
  }

  get f() { return this.resetPwdForm.controls }

  resetPwd() {
    const val: ResetPwdDto = this.resetPwdForm.value;
    if (this.f.confirmPassword.value === this.f.newPassword.value) {
      this.readerService.resetPwd(val).subscribe((data) => {
        if (data === val.username) {
          this.logger.info(`Success reset password for ${val.username}`)
          this.router.navigateByUrl('reader/login');
        } else {
          this.logger.warn(`Reset password for ${val.username} failed`);
          window.alert(`Reset password failed, try again later`);
        }
      });
    } else {
      window.alert('New passwords are not matched, please check');
    }
  }
}
