import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogPortalComponent } from './blog-portal/blog-portal.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { ShareModule } from '../share/share.module';
import { BlogInfoComponent } from './blog-info/blog-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogListComponent } from './blog-list/blog-list.component';
import { LibModule } from '../librarian/lib.module';
import { BlogManageComponent } from './blog-manage/blog-manage.component';
import { ReaderModule } from '../reader/reader.module';
import { ReadBlogComponent } from './read-blog/read-blog.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    BlogPortalComponent,
    CreateBlogComponent,
    UpdateBlogComponent,
    BlogInfoComponent,
    BlogListComponent,
    BlogManageComponent,
    ReadBlogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShareModule,
    ReaderModule,
    LibModule,
    BlogRoutingModule,
    TranslateModule,
  ]
})
export class BlogModule { }
