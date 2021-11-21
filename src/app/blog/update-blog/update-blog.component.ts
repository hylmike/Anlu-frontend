import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { Blog } from 'src/app/common/blog.dto';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private fb: FormBuilder,
    public translate: TranslateService,
  ) { }

  blogUpdateForm = this.fb.group({
    topic: [''],
    category: [''],
    content: [''],
    creator: [''],
    keywords: [''],
  })

  ngOnInit(): void {
    const blogID = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(blogID).subscribe((blog: Blog) => {
      if (blog && blog.topic) {
        this.blogUpdateForm.setValue({
          topic: blog.topic,
          category: blog.category,
          content: blog.content,
          creator: blog.creator,
          keywords: blog.keywords,
        });
        this.logger.info(`Success put current blog setting into form`);
      } else {
        this.logger.warn(`Failed to get blog ${blogID} info from server`);
      }
    })

  }

  updateBlog() {
    const updateInfo = this.blogUpdateForm.value;
    const blogID = this.route.snapshot.paramMap.get('id');
    this.blogService.update(blogID, updateInfo).subscribe((blog: Blog) => {
      if (blog && blog.topic) {
        this.logger.info(`Success update info of blog ${blogID}`)
        this.router.navigateByUrl(`/blog/reviewinfo/${blogID}`);
      } else {
        this.logger.warn(`Failed to update blog ${blogID} in server`);
      }
    })
  }

}
