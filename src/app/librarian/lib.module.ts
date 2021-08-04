import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibRoutingModule } from './lib-routing.module';
import { LibrarianPortalComponent } from './librarian-portal/librarian-portal.component';
import { LibLoginComponent } from './lib-login/lib-login.component';
import { LibrarianRegisterComponent } from './librarian-register/librarian-register.component';
import { LibrarianUpdateComponent } from './librarian-update/librarian-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LibrarianHeaderComponent } from './librarian-header/librarian-header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { LibProfileComponent } from './lib-profile/lib-profile.component';
import { ShareModule } from '../share/share.module';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';

@NgModule({
  declarations: [
    LibLoginComponent,
    LibrarianPortalComponent,
    LibrarianRegisterComponent,
    LibrarianUpdateComponent,
    LibrarianHeaderComponent,
    AdminHeaderComponent,
    AdminPortalComponent,
    LibProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShareModule,
    LibRoutingModule,
  ]
})
export class LibModule { }
