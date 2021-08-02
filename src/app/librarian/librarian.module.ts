import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrarianRoutingModule } from './librarian-routing.module';
import { LibrarianPortalComponent } from './librarian-portal/librarian-portal.component';
import { LibrarianLoginComponent } from './librarian-login/librarian-login.component';
import { LibrarianRegisterComponent } from './librarian-register/librarian-register.component';
import { LibrarianUpdateComponent } from './librarian-update/librarian-update.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LibrarianLoginComponent,
    LibrarianPortalComponent,
    LibrarianRegisterComponent,
    LibrarianUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibrarianRoutingModule,
  ]
})
export class LibrarianModule { }
