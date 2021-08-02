import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReaderRegisterComponent } from './reader-register/reader-register.component';
import { ReaderLoginComponent } from './reader-login/reader-login.component';
import { ReaderLogoutComponent } from './reader-logout/reader-logout.component';
import { ReaderUpdateComponent } from './reader-update/reader-update.component';
import { ReaderPortalComponent } from './reader-portal/reader-portal.component';
import { ReaderAuthGuard } from '../auth/reader-auth.guard';
import { ReaderSignedComponent } from './reader-signed/reader-signed.component';
import { ReaderProfileComponent } from './reader-profile/reader-profile.component';
import { ReaderChangePwdComponent } from './reader-change-pwd/reader-change-pwd.component';

const readerRoutes: Routes = [
  {
    path: 'reader/register',
    component: ReaderRegisterComponent,
  },
  {
    path: 'reader/login',
    component: ReaderLoginComponent,
  },
  {
    path: 'reader/:id/profile',
    canActivate: [ReaderAuthGuard],
    component: ReaderProfileComponent,
  },
  {
    path: 'reader/updateprofile',
    canActivate: [ReaderAuthGuard],
    component: ReaderUpdateComponent,
  },
  {
    path: 'reader/changepwd',
    canActivate: [ReaderAuthGuard],
    component: ReaderChangePwdComponent,
  },
  {
    path: 'reader/logout',
    canActivate: [ReaderAuthGuard],
    component: ReaderLogoutComponent,
  },
  {
    path: 'reader/:id',
    canActivate: [ReaderAuthGuard],
    component: ReaderSignedComponent,
    pathMatch: 'full',
  },
  {
    path: 'reader',
    component: ReaderPortalComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(readerRoutes)],
  exports: [RouterModule]
})

export class ReaderRoutingModule { }
