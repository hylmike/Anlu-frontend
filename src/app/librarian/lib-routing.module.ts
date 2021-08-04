import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibAuthGuard } from '../auth/lib-auth.guard';
import { LibrarianRegisterComponent } from './librarian-register/librarian-register.component';
import { LibLoginComponent } from './lib-login/lib-login.component';
import { LibrarianUpdateComponent } from './librarian-update/librarian-update.component';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { LibrarianPortalComponent } from './librarian-portal/librarian-portal.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';

const libRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LibLoginComponent,
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
        path: 'lib-portal',
        canActivate: [LibAuthGuard],
        component: LibrarianPortalComponent,
      },
      {
        path: 'profile/:id',
        canActivate: [AdminAuthGuard],
        component: LibrarianPortalComponent,
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'lib-portal',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(libRoutes)],
  exports: [RouterModule]
})

export class LibRoutingModule { }


