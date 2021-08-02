import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ReaderAuthService } from '../../auth/reader-auth.service';
import { RegisterReaderDto } from '../../common/reader.dto';
import { AlertDialog } from '../../common/message-dialog/message-dialog.component';

@Component({
  selector: 'app-reader-register',
  templateUrl: './reader-register.component.html',
  styleUrls: ['./reader-register.component.css']
})
export class ReaderRegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private readerAuthService: ReaderAuthService,
    private dialog: MatDialog,
  ) { }

  registerForm = this.fb.group({
    username: ['', [Validators.minLength(3), Validators.pattern('[a-zA-Z0-9_]*')]],
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
  })

  ngOnInit(): void {
    // Disable form submissions if there are invalid fields
    (function () {
      // Fetch all forms we want to apply custom validation styles to
      var forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
            form.classList.add('was-validated')
          }, false)
        })
    })()
  }

  register() {
    const val: RegisterReaderDto = this.registerForm.value;
    if (val.confirmPassword === val.password) {
      this.readerAuthService.register(val).subscribe((data) => {
        if (!data) {
          const dialogRef = this.dialog.open(AlertDialog, {
            width: '30%',
            height: '20%',
            data: {
              title: 'Notice',
              message: 'The username already exist, please choose another one.',
            }
          });
          dialogRef.afterClosed().subscribe(() => console.log('Notice dialog window closed'))
          return null;
        }
        console.log(`User ${data.username} already successfully registered in system.`);
        this.router.navigateByUrl('/reader/login');
      })
    } else {
      window.alert('Passwords are not matched, please check')
    }
  }

}
