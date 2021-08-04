import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogPortalComponent } from './blog-portal/blog-portal.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [
    BlogPortalComponent,
    CreateBlogComponent,
    UpdateBlogComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
