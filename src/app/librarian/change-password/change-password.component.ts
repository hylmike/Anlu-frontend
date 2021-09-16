import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { ChangePwdDto, Librarian } from 'src/app/common/lib.dto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePwdComponent implements OnInit {

  libID: string;

  constructor(
    private logger: NGXLogger,
    private libAuthService: LibrarianAuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  changePwdForm = this.fb.group({
    username: [''],
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  })

  ngOnInit(): void {
    this.libID = this.route.snapshot.paramMap.get('id');
    this.libAuthService.getProfile(this.libID).subscribe((lib: Librarian) => {
      if (lib && lib.username) {
        this.changePwdForm.setValue({
          username: lib.username,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        this.logger.info(`Success get lib ${this.libID} profile from server`)
      } else {
        this.logger.warn(`Failed to get lib ${this.libID} profile from server`);
      }
    })
  }

  changePwd() {
    const val: ChangePwdDto = this.changePwdForm.value;
    this.libAuthService.changePwd(val).subscribe((data) => {
      if (data === val.username) {
        this.logger.info(`Success changed password for ${val.username}`)
        window.alert(`Success changed the password for ${data}`);
        this.router.navigateByUrl(`lib/profile/${this.libID}`);
      } else {
        this.logger.warn(`Change password for ${val.username} failed`);
        window.alert(`Changing password failed, try again later`)
      }
    });
  }

  cancel() {
    this.logger.info(`Reader ${this.libID} cancelled password change`);
    this.router.navigateByUrl(`lib/profile/${this.libID}`);
  }

}
