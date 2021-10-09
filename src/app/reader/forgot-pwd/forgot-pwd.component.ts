import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ReaderService } from '../reader.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private router: Router,
    private fb: FormBuilder,
    private readerService: ReaderService,
  ) { }

  emailForm= this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  ngOnInit(): void {
  }

  submitEmail() {
    const val = this.emailForm.value;
    this.readerService.verifyEmail(val).subscribe((data) => {
      if (data) {
        this.logger.info(`Email validation success for reader ${data}`);
        this.readerService.sendResetEmail(val).subscribe((data) => {
          if (data) {
            window.alert('Please check your email and follow it to reset the password');
            this.router.navigateByUrl('/reader/login');
          }
        })
      } else {
        this.logger.warn('Email validation failed');
        window.alert('No account is associated with this email')
        this.emailForm.setValue({email:''});
      }
    })
  }
}
