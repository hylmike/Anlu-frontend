import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DonateComponent } from './donate/donate.component';

@NgModule({
  declarations: [
    HomeComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    AboutUsComponent,
    DonateComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent,
    SiteFooterComponent,
  ]
})
export class ShareModule { }
