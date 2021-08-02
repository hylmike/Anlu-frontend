import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { BookRoutingModule } from './book-routing.module';
import { BookRegisterComponent } from './book-register/book-register.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { BookPortalComponent } from './book-portal/book-portal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

@NgModule({
  declarations: [
    BookRegisterComponent,
    BookUpdateComponent,
    BookDeleteComponent,
    BookPortalComponent,
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookRoutingModule,
    MatProgressBarModule,
    MatDialogModule,
  ]
})
export class BookModule { }
