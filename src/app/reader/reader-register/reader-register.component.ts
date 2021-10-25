import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { ReaderAuthService } from '../../auth/reader-auth.service';
import { RegisterReaderDto } from '../../common/reader.dto';

@Component({
  selector: 'app-reader-register',
  templateUrl: './reader-register.component.html',
  styleUrls: ['./reader-register.component.css'],
})
export class ReaderRegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private readerAuthService: ReaderAuthService,
    private logger: NGXLogger,
    public translate: TranslateService
  ) {}

  registerForm = this.fb.group({
    username: [
      '',
      [Validators.minLength(3), Validators.pattern('[a-zA-Z0-9_]*')],
    ],
    password: ['', Validators.minLength(5)],
    confirmPassword: ['', Validators.minLength(5)],
    email: ['', Validators.email],
    firstName: [''],
    lastName: [''],
    gender: [''],
    birthday: [''],
    phoneNumber: [''],
    homeAddress: [''],
    province: [''],
    postcode: [''],
    securityQuestion: ['', Validators.required],
    securityAnswer: ['', Validators.required],
  });

  ngOnInit(): void {
    // Disable form submissions if there are invalid fields
    (function () {
      // Fetch all forms we want to apply custom validation styles to
      var forms = document.querySelectorAll('.needs-validation');

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          'submit',
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          },
          false
        );
      });
    })();
  }

  register() {
    let notice1: string, notice2: string;
    this.translate
      .stream(['readerReg.notice-1', 'readerReg.notice-2'])
      .subscribe((res) => {
        notice1 = res['readerReg.notice-1'];
        notice2 = res['readerReg.notice-2'];
      });
    const val: RegisterReaderDto = this.registerForm.value;
    if (val.confirmPassword === val.password) {
      this.readerAuthService.register(val).subscribe((data) => {
        if (!data) {
          window.alert(notice1);
          return null;
        }
        this.logger.info(
          `User ${data.username} already successfully registered in system.`
        );
        this.router.navigateByUrl('/reader/login');
      });
    } else {
      this.logger.warn('Passwords are not matched, please check');
      window.alert(notice2);
    }
  }
}
