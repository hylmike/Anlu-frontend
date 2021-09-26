import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { BookRoutingModule } from './book-routing.module';
import { BookRegisterComponent } from './book-register/book-register.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BookViewerComponent } from './book-viewer/book-viewer.component';
import { ShareModule } from '../share/share.module';
import { AudiobookPlayComponent } from './audiobook-play/audiobook-play.component';
import { AudiobookPortalComponent } from './audiobook-portal/audiobook-portal.component';
import { EbookPortalComponent } from './ebook-portal/ebook-portal.component';
import { BookDashboardComponent } from './book-dashboard/book-dashboard.component';
import { ReaderModule } from '../reader/reader.module';
import { BookProfileComponent } from './book-profile/book-profile.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { BookManageComponent } from './book-manage/book-manage.component';
import { LibModule } from '../librarian/lib.module';
import { BookSearchComponent } from './book-search/book-search.component';
import { PodcastPortalComponent } from './podcast-portal/podcast-portal.component';
import { BookWishlistComponent } from './book-wishlist/book-wishlist.component';

@NgModule({
  declarations: [
    BookRegisterComponent,
    BookUpdateComponent,
    BookViewerComponent,
    AudiobookPlayComponent,
    AudiobookPortalComponent,
    EbookPortalComponent,
    BookDashboardComponent,
    BookProfileComponent,
    BookInfoComponent,
    BookManageComponent,
    BookSearchComponent,
    PodcastPortalComponent,
    BookWishlistComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibModule,
    MatProgressBarModule,
    MatDialogModule,
    ReaderModule,
    ShareModule,
    BookRoutingModule,
  ],
})
export class BookModule { }
