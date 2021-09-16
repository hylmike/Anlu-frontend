import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DonateComponent } from './donate/donate.component';
import { BookListComponent } from './book-list/book-list.component';
import { ChartsModule } from 'ng2-charts';
import { InventorySummaryComponent } from './inventory-summary/inventory-summary.component';
import { ReaderAnalysisComponent } from './reader-analysis/reader-analysis.component';

@NgModule({
  declarations: [
    HomeComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    AboutUsComponent,
    DonateComponent,
    BookListComponent,
    InventorySummaryComponent,
    ReaderAnalysisComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
  ],
  exports: [
    HomeComponent,
    SiteFooterComponent,
    BookListComponent,
    InventorySummaryComponent,
    ReaderAnalysisComponent,
  ]
})
export class ShareModule { }
