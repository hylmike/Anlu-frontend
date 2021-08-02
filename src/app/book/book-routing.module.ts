import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { LibrarianAuthGuard } from '../auth/librarian-auth.guard';
import { ReaderAuthGuard } from '../auth/reader-auth.guard';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { BookRegisterComponent } from './book-register/book-register.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { BookPortalComponent } from './book-portal/book-portal.component';

const bookRoutes: Routes = [
  {
    path: 'book/register',
    //canActivate: [LibrarianAuthGuard],
    component: BookRegisterComponent,
  },
  {
    path: 'book/update',
    canActivate: [LibrarianAuthGuard],
    component: BookUpdateComponent,
  },
  {
    path: 'book/read/:id/:num',
    //canActivate: [ReaderAuthGuard],
    component: PdfViewerComponent,
  },
  {
    path: 'book/remove',
    canActivate: [AdminAuthGuard],
    component: BookDeleteComponent,
  },
  {
    path: 'book/',
    canActivate: [ReaderAuthGuard],
    component: BookPortalComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
