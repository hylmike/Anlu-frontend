import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { LibAuthGuard } from '../auth/lib-auth.guard';
import { ReaderAuthGuard } from '../auth/reader-auth.guard';
import { BookViewerComponent } from './book-viewer/book-viewer.component';
import { BookRegisterComponent } from './book-register/book-register.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { AudiobookPlayComponent } from './audiobook-play/audiobook-play.component';
import { EbookPortalComponent } from './ebook-portal/ebook-portal.component';
import { AudiobookPortalComponent } from './audiobook-portal/audiobook-portal.component';
import { BookDashboardComponent } from './book-dashboard/book-dashboard.component';
import { BookProfileComponent } from './book-profile/book-profile.component';

const bookRoutes: Routes = [
  {
    path: 'book/register',
    canActivate: [LibAuthGuard],
    component: BookRegisterComponent,
  },
  {
    path: 'book/profile/:id',
    canActivate: [ReaderAuthGuard],
    component: BookProfileComponent,
  },
  {
    path: 'book/update',
    canActivate: [LibAuthGuard],
    component: BookUpdateComponent,
  },
  {
    path: 'book/read/:id/:num',
    canActivate: [ReaderAuthGuard],
    component: BookViewerComponent,
  },
  {
    path: 'book/play/:id/:time',
    canActivate: [ReaderAuthGuard],
    component: AudiobookPlayComponent,
  },
  {
    path: 'book/remove',
    canActivate: [AdminAuthGuard],
    component: BookDeleteComponent,
  },
  {
    path: 'book/dashboard',
    canActivate: [LibAuthGuard],
    component: BookDashboardComponent,
  },
  {
    path: 'ebook',
    canActivate: [ReaderAuthGuard],
    component: EbookPortalComponent,
    pathMatch: 'full',
  },
  {
    path: 'audiobook',
    canActivate: [ReaderAuthGuard],
    component: AudiobookPortalComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
