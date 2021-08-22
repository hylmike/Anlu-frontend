import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { WorkshopService } from '../workshop.service';
import { HttpEventType } from '@angular/common/http';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ThemePalette } from '@angular/material/core';
import { RegisterWorkshopDto } from 'src/app/common/workshop.dto';

@Component({
  selector: 'app-create-workshop',
  templateUrl: './create-workshop.component.html',
  styleUrls: ['./create-workshop.component.css']
})
export class CreateWorkshopComponent implements OnInit {

  uploadPosterProgress: number;
  posterUploadUrl = '';
  color: ThemePalette = 'accent';
  libName = '';

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private router: Router,
    private workshopService: WorkshopService,
    private tokenService: TokenStorageService,
  ) { }

  workshopRegForm = this.fb.group({
    topic: [''],
    place: [''],
    organizer: [''],
    startTime: [''],
    duration: [''],
    poster: [''],
    creator: [''],
    remark: [''],
  })

  ngOnInit(): void {
    this.libName = this.tokenService.getUsername().slice(3,);
    this.workshopRegForm.setValue({
      topic: '',
      place: '',
      organizer: '',
      startTime: '',
      duration: '',
      poster: '',
      creator: this.libName,
      remark: '',
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

  onPosterSelect(event) {
    const coverFile = event.target.files[0];
    if (coverFile) {
      console.log(coverFile);
      this.workshopService.fileUpload(coverFile).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadPosterProgress = Math.round(100 * (event.loaded / event.total));
        }
        if (event.type === HttpEventType.Response && event.status === 201) {
          console.log("Workshop poster uploaded successfully");
          this.posterUploadUrl = event.body['fileUrl'];
          console.log(this.posterUploadUrl);
          const posterFileInput = document.getElementById('poster');
          posterFileInput.className = 'form-control is-valid';
        }
      })
    }
  }

  workshopRegister() {
    //Check if poster picture was already uploaded
    if (this.posterUploadUrl === '') {
      window.alert('Please upload poster picture first.');
      return null;
    }
    const workshopInfo: RegisterWorkshopDto = this.workshopRegForm.value;
    workshopInfo.poster = this.posterUploadUrl;
    this.workshopService.register(workshopInfo).subscribe((data) => {
      //Check if workshop already exist in database, return null means existed
      if (!data) {
        this.logger.warn(`The workshop topic ${workshopInfo.topic} exists`);
        window.alert(`The workshop topic ${workshopInfo.topic} exists, please choose another one`)
        return null;
      }
      this.logger.info(`Workshop ${workshopInfo.topic} already successfully registered in system.`);
      window.alert(`Success registered workshop ${workshopInfo.topic} in system.`);
      window.location.reload();
    })
  }

  goPortal() {
    this.router.navigateByUrl('/lib/lib-portal');
  }

}
