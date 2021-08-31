import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { LibAuthGuard } from '../auth/lib-auth.guard';
import { BlogInfoComponent } from './blog-info/blog-info.component';
import { BlogPortalComponent } from './blog-portal/blog-portal.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';

const blogRoutes: Routes = [
  {
    path: 'blog/create',
    canActivate: [LibAuthGuard],
    component: CreateBlogComponent,
  },
  {
    path: 'blog/update',
    canActivate: [LibAuthGuard],
    component: UpdateBlogComponent,
  },
  {
    path: 'blog/reviewinfo/:id',
    canActivate: [LibAuthGuard],
    component: BlogInfoComponent,
  },
  {
    path: 'blog',
    canActivate: [LibAuthGuard],
    component: BlogPortalComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
