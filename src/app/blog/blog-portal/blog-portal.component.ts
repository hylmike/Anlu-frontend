import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Blog } from 'src/app/common/blog.dto';
import { CommonService } from 'src/app/common/common.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-portal',
  templateUrl: './blog-portal.component.html',
  styleUrls: ['./blog-portal.component.css']
})
export class BlogPortalComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private blogService: BlogService,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    private datePipe: DatePipe,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const readerName = this.tokenService.getUsername();
    this.commonService.setSubject(readerName);
    this.blogService.getLatest(0).subscribe((bList: Blog[]) => {
      if (bList && bList.length > 0) {
        this.logger.info("success get blog list from server");
        //Generate news/infomation/system notice blog list
        let newsList: Blog[] = [], infoList: Blog[] = [], noticeList: Blog[] = [];
        for (const blog of bList) {
          switch (blog.category) {
            case 'News':
              newsList.push(blog);
              break;
            case 'Information':
              infoList.push(blog);
              break;
            case 'System Notice':
              noticeList.push(blog);
              break;
          }
        }
        //Render all the blog list
        if (newsList.length > 0) this.renderList('news', newsList);
        if (infoList.length > 0) this.renderList('info', infoList);
        if (noticeList.length > 0) this.renderList('notice', noticeList);
        this.logger.info('Success render blog list');
      } else if (bList.length == 0) {
        this.logger.info("Can't find any blog in server");
      } else {
        this.logger.warn('Failed to find blog list from backend');
      }
    })
  }

  renderList(listName: string, blogList: Blog[]) {
    //Chose the listContainer based on list name
    let listContainer: HTMLDivElement;
    switch (listName) {
      case 'news':
        listContainer = document.querySelector('div.news-list');
        break;
      case 'info':
        listContainer = document.querySelector('div.info-list');
        break;
      case 'notice':
        listContainer = document.querySelector('div.notice-list');
        break;
    }
    //remove old list
    while (listContainer.childElementCount > 2) {
      listContainer.removeChild(listContainer.lastChild);
    }
    //generate html elements based on input list
    for (const blog of blogList) {
      const divTopic = document.createElement('div');
      divTopic.className = 'col-md-6';
      listContainer.appendChild(divTopic);
      const aTopic = document.createElement('a');
      aTopic.className = 'topic';
      aTopic.href=`/blog/read/${blog._id}`
      aTopic.innerHTML = blog.topic;
      divTopic.appendChild(aTopic);
      const divTime = document.createElement('div');
      divTime.className = 'col-md-6';
      listContainer.appendChild(divTime);
      const pTime = document.createElement('p');
      pTime.className = 'createTime';
      pTime.innerHTML = this.datePipe.transform(blog.createTime, 'short');
      divTime.appendChild(pTime);
    }
  }
}
