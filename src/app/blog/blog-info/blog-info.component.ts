import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Blog } from 'src/app/common/blog.dto';
import { CommonService } from 'src/app/common/common.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-info',
  templateUrl: './blog-info.component.html',
  styleUrls: ['./blog-info.component.css']
})
export class BlogInfoComponent implements OnInit {

  blog: Blog;
  updateUrl: string;

  constructor(
    private logger: NGXLogger,
    private blogService: BlogService,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const libName = this.tokenService.getUsername().slice(3,);
    this.commonService.setSubject(libName);
    const blogID = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(blogID).subscribe((blog: Blog) => {
      if (blog && blog.topic) {
        this.blog = blog;
        this.updateUrl = `/blog/update/${blogID}`;
        this.logger.info(`Success get blog ${blogID} from server`);
      } else {
        this.logger.warn(`Failed to get blog ${blogID} from server`);
      }
    })
  }

}
