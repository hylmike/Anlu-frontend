import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReaderLoginComponent } from './reader-login/reader-login.component';
import { ReaderRegisterComponent } from './reader-register/reader-register.component';
import { ReaderLogoutComponent } from './reader-logout/reader-logout.component';
import { ReaderUpdateComponent } from './reader-update/reader-update.component';
import { ReaderRoutingModule } from './reader-routing.module';
import { AuthModule } from '../auth/auth.module';
import { ReaderPortalComponent } from './reader-portal/reader-portal.component';
import { ReaderHeaderComponent } from './reader-header/reader-header.component';
import { ReaderSignedComponent } from './reader-signed/reader-signed.component';
import { ReaderProfileComponent } from './reader-profile/reader-profile.component';
import { ReaderChangePwdComponent } from './reader-change-pwd/reader-change-pwd.component';
import { ShareModule } from '../share/share.module';
import { AccountManageComponent } from './account-manage/account-manage.component';
import { ReaderService } from './reader.service';
import { FavorBookComponent } from './favor-book/favor-book.component';
import { LibModule } from '../librarian/lib.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { TranslateModule } from '@ngx-translate/core';
import { AboutUsComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [
    ReaderLoginComponent,
    ReaderRegisterComponent,
    ReaderLogoutComponent,
    ReaderUpdateComponent,
    ReaderPortalComponent,
    ReaderHeaderComponent,
    ReaderSignedComponent,
    ReaderProfileComponent,
    ReaderChangePwdComponent,
    AccountManageComponent,
    FavorBookComponent,
    ForgotPwdComponent,
    ResetPwdComponent,
    HeroSectionComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShareModule,
    AuthModule,
    NgxPaginationModule,
    BrowserModule,
    LibModule,
    ReaderRoutingModule,
    TranslateModule,
  ],
  providers: [ReaderService],
  exports: [
    ReaderHeaderComponent,
  ]
})
export class ReaderModule { }
