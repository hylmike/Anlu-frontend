import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { RegisterLibDto } from '../../common/lib.dto';
import { LibrarianAuthService } from '../../auth/librarian-auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lib-register',
  templateUrl: './lib-register.component.html',
  styleUrls: ['./lib-register.component.css'],
})
export class LibRegisterComponent implements OnInit {
  constructor(
    private logger: NGXLogger,
    private router: Router,
    private fb: FormBuilder,
    private libAuthService: LibrarianAuthService,
    public translate: TranslateService
  ) {}

  libRegisterForm = this.fb.group({
    username: [
      '',
      [Validators.minLength(3), Validators.pattern('[a-zA-Z0-9_.]*')],
    ],
    password: ['', Validators.minLength(5)],
    confirmPassword: ['', Validators.minLength(5)],
    email: ['', [Validators.email, Validators.required]],
    role: ['', Validators.required],
    firstName: [''],
    lastName: [''],
    phoneNumber: [''],
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

  libRegister() {
    const val: RegisterLibDto = this.libRegisterForm.value;
    let notice1: string, notice2: string, notice3: string;
    this.translate
      .stream(['libReg.notice-1', 'libReg.notice-2', 'libReg.notice-3'], {
        username: val.username,
        role: val.role,
      })
      .subscribe((res) => {
        notice1 = res['libReg.notice-1'];
        notice2 = res['libReg.notice-2'];
        notice3 = res['libReg.notice-3'];
      });
    if (val.confirmPassword === val.password) {
      this.libAuthService.register(val).subscribe((data) => {
        if (!data) {
          this.logger.warn(
            `Username ${val.username} exists, register lib failed`
          );
          window.alert(notice1);
          return null;
        }
        this.logger.info(
          `${val.role} ${data.username} already successfully registered in system.`
        );
        window.alert(notice2);
        this.router.navigateByUrl('/lib/account-manage');
      });
    } else {
      window.alert(notice3);
    }
  }
}
