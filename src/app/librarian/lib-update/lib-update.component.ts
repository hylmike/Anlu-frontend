import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { Librarian } from 'src/app/common/lib.dto';

@Component({
  selector: 'app-lib-update',
  templateUrl: './lib-update.component.html',
  styleUrls: ['./lib-update.component.css']
})
export class LibUpdateComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private router: Router,
    private route: ActivatedRoute,
    private libAuthService: LibrarianAuthService,
    private fb: FormBuilder,
    public translate: TranslateService,
  ) { }

  libUpdateForm = this.fb.group({
    username: [''],
    email: [''],
    role: [''],
    firstName: [''],
    lastName: [''],
    phoneNumber: [''],
    isActive: [''],
  })

  ngOnInit(): void {
    const libID = this.route.snapshot.paramMap.get('id');
    this.libAuthService.getProfile(libID).subscribe((lib: Librarian) => {
      if (lib) {
        this.libUpdateForm.setValue({
          username: lib.username,
          email: lib.email,
          role: lib.role,
          firstName: lib.firstName,
          lastName: lib.lastName,
          phoneNumber: lib.phoneNumber,
          isActive: lib.isActive === true ? 'Active' : 'Inactive',
        })
      }
    })
  }

  updateLib() {
    const libID = this.route.snapshot.paramMap.get('id');
    const updateInfo = this.libUpdateForm.value;
    if (this.libUpdateForm.dirty) {
      this.libAuthService.updateProfile(updateInfo).subscribe((data) => {
        if (data) {
          this.logger.info(`Success update profile of ${updateInfo.role} ${updateInfo.username}`)
          this.router.navigateByUrl(`/lib/profile/${libID}`);
        } else {
          this.logger.warn(`Failed to update profile of ${updateInfo.username} in server side`);
        }
      })
    }

  }

}
