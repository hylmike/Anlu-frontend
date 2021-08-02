import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibrarianAuthGuard } from '../auth/librarian-auth.guard';
import { LibrarianRegisterComponent } from './librarian-register/librarian-register.component';
import { LibrarianLoginComponent } from './librarian-login/librarian-login.component';
import { LibrarianUpdateComponent } from './librarian-update/librarian-update.component';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { LibrarianPortalComponent } from './librarian-portal/librarian-portal.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';

const librarianRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LibrarianLoginComponent,
      },
      {
        path: 'register',
        canActivate: [AdminAuthGuard],
        component: LibrarianRegisterComponent,
      },
      {
        path: 'update',
        canActivate: [AdminAuthGuard],
        component: LibrarianUpdateComponent,
      },
      {
        path: 'admin-portal',
        canActivate: [AdminAuthGuard],
        component: AdminPortalComponent,
      },
      {
        path: '',
        canActivate: [LibrarianAuthGuard],
        component: LibrarianPortalComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(librarianRoutes)],
  exports: [RouterModule]
})

export class LibrarianRoutingModule { }


