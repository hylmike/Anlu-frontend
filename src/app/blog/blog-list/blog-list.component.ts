import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Blog } from 'src/app/common/blog.dto';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnChanges {
  @Input() blogList: Blog[];

  constructor(
    private logger: NGXLogger,
    private blogService: BlogService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    const listContainer = document.querySelector('div#list');
    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    if (this.blogList) {
      for (const blog of this.blogList) {
        //Add new line for this blog
        let rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        listContainer.appendChild(rowDiv);

        //Add blog id field
        let colDiv1 = document.createElement('div');
        colDiv1.className = 'col-md-2';
        let p1 = document.createElement('p');
        p1.className = 'col-content';
        p1.innerHTML = blog._id;
        colDiv1.appendChild(p1);
        rowDiv.appendChild(colDiv1);

        //Add blog topic field
        let colDiv2 = document.createElement('div');
        colDiv2.className = 'col-md-3';
        let p2 = document.createElement('p');
        p2.className = 'col-content';
        p2.innerHTML = blog.topic;
        colDiv2.appendChild(p2);
        rowDiv.appendChild(colDiv2);

        //Add blog category field
        let colDiv3 = document.createElement('div');
        colDiv3.className = 'col-md-2';
        let p3 = document.createElement('p');
        p3.className = 'col-content';
        p3.innerHTML = blog.category;
        colDiv3.appendChild(p3);
        rowDiv.appendChild(colDiv3);

        //Add blog create date field
        let colDiv4 = document.createElement('div');
        colDiv4.className = 'col-md-2';
        let p4 = document.createElement('p');
        p4.className = 'col-content';
        p4.innerHTML = this.datePipe.transform(blog.createTime, 'short');
        //p4.innerHTML = blog.createTime.toLocaleString();
        colDiv4.appendChild(p4);
        rowDiv.appendChild(colDiv4);

        //Add blog info review link
        let colDiv5 = document.createElement('div');
        colDiv5.className = 'col-md-1';
        let a1 = document.createElement('a');
        a1.className = 'col-content';
        a1.href = `/blog/reviewinfo/${blog._id}`;
        a1.innerHTML = 'Review';
        colDiv5.appendChild(a1);
        rowDiv.appendChild(colDiv5);

        //Add blog update link
        let colDiv6 = document.createElement('div');
        colDiv6.className = 'col-md-1';
        let a2 = document.createElement('a');
        a2.className = 'col-content';
        a2.href = `/blog/update/${blog._id}`;
        a2.innerHTML = 'Update';
        colDiv6.appendChild(a2);
        rowDiv.appendChild(colDiv6);

        //Add blog delete link
        let colDiv7 = document.createElement('div');
        colDiv7.className = 'col-md-1';
        let a3 = document.createElement('a');
        a3.className = 'col-content delete-link';
        a3.addEventListener('click', this.delBlog.bind(this, blog._id));
        a3.innerHTML = 'Delete';
        colDiv7.appendChild(a3);
        rowDiv.appendChild(colDiv7);
      }
    }
  }

  delBlog(blogID: string) {
    if(window.confirm('Please confirm if you want to delete this blog')) {
      this.blogService.delBlog(blogID).subscribe((result)=>{
        if (result == blogID) {
          this.logger.info(`Success delete blog ${blogID}`);
          window.alert('Success delete the blog');
          location.reload();
        } else {
          this.logger.warn(`Failed to delete blog ${blogID}`);
        }
      })
    }
  }

}
