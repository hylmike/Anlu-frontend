import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { BookListComponent } from './book-list/book-list.component';
import { ChartsModule } from 'ng2-charts';
import { InventorySummaryComponent } from './inventory-summary/inventory-summary.component';
import { ReaderAnalysisComponent } from './reader-analysis/reader-analysis.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomeComponent,
    SiteFooterComponent,
    BookListComponent,
    InventorySummaryComponent,
    ReaderAnalysisComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    TranslateModule,
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
