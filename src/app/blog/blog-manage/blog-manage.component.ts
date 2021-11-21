import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Blog } from 'src/app/common/blog.dto';
import { CommonService } from 'src/app/common/common.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-manage',
  templateUrl: './blog-manage.component.html',
  styleUrls: ['./blog-manage.component.css']
})
export class BlogManageComponent implements OnInit {

  blogList: Blog[];

  constructor(
    private logger: NGXLogger,
    private blogService: BlogService,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const libName = this.tokenService.getUsername().slice(3,);
    this.commonService.setSubject(libName);
    this.blogService.getLatest(0).subscribe((bList: Blog[]) => {
      if (bList && bList.length > 0) {
        this.blogList = bList;
        this.logger.info('Success to get log list from backend');
      } else if (bList.length==0) {
        this.logger.info("Can't find any blog in server");
      } else {
        this.logger.warn('Failed to find blog list from backend');
      }
    })
  }

}
