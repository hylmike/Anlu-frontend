import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibAuthGuard } from '../auth/lib-auth.guard';
import { ReaderAuthGuard } from '../auth/reader-auth.guard';
import { BlogInfoComponent } from './blog-info/blog-info.component';
import { BlogManageComponent } from './blog-manage/blog-manage.component';
import { BlogPortalComponent } from './blog-portal/blog-portal.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ReadBlogComponent } from './read-blog/read-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';

const blogRoutes: Routes = [
  {
    path: 'blog/create',
    canActivate: [LibAuthGuard],
    component: CreateBlogComponent,
  },
  {
    path: 'blog/update/:id',
    canActivate: [LibAuthGuard],
    component: UpdateBlogComponent,
  },
  {
    path: 'blog/read/:id',
    canActivate: [ReaderAuthGuard],
    component: ReadBlogComponent,
  },
  {
    path: 'blog/reviewinfo/:id',
    canActivate: [LibAuthGuard],
    component: BlogInfoComponent,
  },
  {
    path: 'blog/manage',
    canActivate: [LibAuthGuard],
    component: BlogManageComponent,
  },
  {
    path: 'blog',
    canActivate: [ReaderAuthGuard],
    component: BlogPortalComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
