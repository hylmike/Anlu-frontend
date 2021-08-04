import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { LibAuthGuard } from '../auth/lib-auth.guard';
import { ReaderAuthGuard } from '../auth/reader-auth.guard';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { BookRegisterComponent } from './book-register/book-register.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { BookPortalComponent } from './book-portal/book-portal.component';

const bookRoutes: Routes = [
  {
    path: 'book/register',
    canActivate: [LibAuthGuard],
    component: BookRegisterComponent,
  },
  {
    path: 'book/update',
    canActivate: [LibAuthGuard],
    component: BookUpdateComponent,
  },
  {
    path: 'book/read/:id/:num',
    canActivate: [ReaderAuthGuard],
    component: PdfViewerComponent,
  },
  {
    path: 'book/remove',
    canActivate: [AdminAuthGuard],
    component: BookDeleteComponent,
  },
  {
    path: 'book',
    canActivate: [ReaderAuthGuard],
    component: BookPortalComponent,
    pathMatch: 'full',
  },
  {
    path: 'book/dashboard',
    canActivate: [LibAuthGuard],
    component: BookPortalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
