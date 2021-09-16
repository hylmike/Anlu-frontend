import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibRoutingModule } from './lib-routing.module';
import { LibrarianPortalComponent } from './librarian-portal/librarian-portal.component';
import { LibLoginComponent } from './lib-login/lib-login.component';
import { LibRegisterComponent } from './lib-register/lib-register.component';
import { LibUpdateComponent } from './lib-update/lib-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LibrarianHeaderComponent } from './librarian-header/librarian-header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { LibProfileComponent } from './lib-profile/lib-profile.component';
import { ShareModule } from '../share/share.module';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AccountManageComponent } from './account-manage/account-manage.component';
import { ChangePwdComponent } from './change-password/change-password.component';
import { ReaderModule } from '../reader/reader.module';

@NgModule({
  declarations: [
    LibLoginComponent,
    LibrarianPortalComponent,
    LibrarianHeaderComponent,
    AdminHeaderComponent,
    AdminPortalComponent,
    LibProfileComponent,
    LibRegisterComponent,
    LibUpdateComponent,
    AccountManageComponent,
    ChangePwdComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShareModule,
    LibRoutingModule,
  ],
  exports: [
    LibrarianHeaderComponent,
    AdminHeaderComponent,
  ]
})
export class LibModule { }
