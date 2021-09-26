import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibAuthGuard } from '../auth/lib-auth.guard';
import { ReaderAuthGuard } from '../auth/reader-auth.guard';
import { BookViewerComponent } from './book-viewer/book-viewer.component';
import { BookRegisterComponent } from './book-register/book-register.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { AudiobookPlayComponent } from './audiobook-play/audiobook-play.component';
import { EbookPortalComponent } from './ebook-portal/ebook-portal.component';
import { AudiobookPortalComponent } from './audiobook-portal/audiobook-portal.component';
import { BookDashboardComponent } from './book-dashboard/book-dashboard.component';
import { BookProfileComponent } from './book-profile/book-profile.component';
import { BookManageComponent } from './book-manage/book-manage.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { PodcastPortalComponent } from './podcast-portal/podcast-portal.component';
import { BookWishlistComponent } from './book-wishlist/book-wishlist.component';

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
    path: 'book/reviewinfo/:id',
    canActivate: [LibAuthGuard],
    component: BookInfoComponent,
  },
  {
    path: 'book/update/:id',
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
    path: 'book/:role/search',
    //canActivate: [ReaderAuthGuard],
    component: BookSearchComponent,
  },
  {
    path: 'book/manage',
    canActivate: [LibAuthGuard],
    component: BookManageComponent,
  },
  {
    path: 'book/wishlist/manage',
    canActivate: [LibAuthGuard],
    component: BookWishlistComponent,
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
  {
    path: 'podcast',
    canActivate: [ReaderAuthGuard],
    component: PodcastPortalComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
