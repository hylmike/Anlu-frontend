import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { DatePipe } from '@angular/common';

import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { Reader, UpdateReaderDto } from 'src/app/common/reader.dto';

@Component({
  selector: 'app-update',
  templateUrl: './reader-update.component.html',
  styleUrls: ['./reader-update.component.css']
})
export class ReaderUpdateComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private readerAuthService: ReaderAuthService,
    private logger: NGXLogger,
    private datePipe: DatePipe,
  ) { }

  updateForm = this.fb.group({
    username: [''],
    email: [''],
    firstName: [''],
    lastName: [''],
    gender: [''],
    birthday: [''],
    phoneNumber: [''],
    homeAddress: [''],
    province: [''],
    postcode: [''],
    securityQuestion: [''],
    securityAnswer: [''],
  })

  ngOnInit(): void {
    //get current reader with all profile settings
    const readerID = this.readerAuthService.getReaderID();
    this.readerAuthService.getReader(readerID).subscribe((reader: Reader) => {
      const newBirth = this.datePipe.transform(reader.readerProfile.birthday, 'y-MM-dd');
      this.updateForm.setValue({
        username: reader.username,
        email: reader.email,
        firstName: reader.readerProfile.firstName,
        lastName: reader.readerProfile.lastName,
        gender: reader.readerProfile.gender,
        birthday: newBirth,
        phoneNumber: reader.readerProfile.phoneNumber,
        homeAddress: reader.readerProfile.address.homeAddress,
        province: reader.readerProfile.address.province,
        postcode: reader.readerProfile.address.postcode,
        securityQuestion: reader.readerProfile.securityQuestion,
        securityAnswer: reader.readerProfile.securityAnswer,
      })
    });
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

  update() {
    const val: UpdateReaderDto = this.updateForm.value;
    if (this.updateForm.dirty) {
      this.readerAuthService.updateProfile(val).subscribe((data) => {
        if (typeof data!=='string') {
          this.logger.warn(`Update ${val.username} profile failed`);
          window.alert(`Update profile failed, please check and update again`)
          return null;
        }
        this.logger.info(`Success updated reader ${data} profile.`);
        this.router.navigateByUrl(`/reader/profile/${data}`);
      })
    } else {
      window.alert('You have not update anything yet!');
    }
  }

}
