import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibAuthGuard } from '../auth/lib-auth.guard';
import { LibRegisterComponent } from './lib-register/lib-register.component';
import { LibLoginComponent } from './lib-login/lib-login.component';
import { LibUpdateComponent } from './lib-update/lib-update.component';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { LibrarianPortalComponent } from './librarian-portal/librarian-portal.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AccountManageComponent } from './account-manage/account-manage.component';
import { LibProfileComponent } from './lib-profile/lib-profile.component';

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
        component: LibRegisterComponent,
      },
      {
        path: 'update/:id',
        canActivate: [AdminAuthGuard],
        component: LibUpdateComponent,
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
        path: 'account-manage',
        canActivate: [AdminAuthGuard],
        component: AccountManageComponent,
      },
      {
        path: 'profile/:id',
        canActivate: [AdminAuthGuard],
        component: LibProfileComponent,
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

