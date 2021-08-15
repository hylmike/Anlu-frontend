import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { BookRoutingModule } from './book-routing.module';
import { BookRegisterComponent } from './book-register/book-register.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BookViewerComponent } from './book-viewer/book-viewer.component';
import { ShareModule } from '../share/share.module';
import { AudiobookPlayComponent } from './audiobook-play/audiobook-play.component';
import { AudiobookPortalComponent } from './audiobook-portal/audiobook-portal.component';
import { EbookPortalComponent } from './ebook-portal/ebook-portal.component';
import { BookDashboardComponent } from './book-dashboard/book-dashboard.component';
import { ReaderModule } from '../reader/reader.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookProfileComponent } from './book-profile/book-profile.component';

@NgModule({
  declarations: [
    BookRegisterComponent,
    BookUpdateComponent,
    BookDeleteComponent,
    BookViewerComponent,
    AudiobookPlayComponent,
    AudiobookPortalComponent,
    EbookPortalComponent,
    BookDashboardComponent,
    BookListComponent,
    BookProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    ReaderModule,
    ShareModule,
    BookRoutingModule
  ]
})
export class BookModule { }
