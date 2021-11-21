import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Blog } from 'src/app/common/blog.dto';
import { CommonService } from 'src/app/common/common.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-read-blog',
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.css']
})
export class ReadBlogComponent implements OnInit {

  blog: Blog;

  constructor(
    private logger: NGXLogger,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const readerName = this.tokenService.getUsername();
    this.commonService.setSubject(readerName);
    const blogID = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(blogID).subscribe((blog: Blog)=>{
      if (blog && blog.topic) {
        this.blog = blog;
        this.logger.info(`Success get blog ${blogID} from server`);
      } else {
        this.logger.warn(`Failed to get blog ${blogID} from server`);
      }
    })
  }

}
