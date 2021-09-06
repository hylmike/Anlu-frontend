import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { BlogService } from 'src/app/blog/blog.service';
import { Blog } from 'src/app/common/blog.dto';
import { Workshop } from 'src/app/common/workshop.dto';
import { WorkshopService } from 'src/app/workshop/workshop.service';

@Component({
  selector: 'app-lib-events',
  templateUrl: './lib-events.component.html',
  styleUrls: ['./lib-events.component.css']
})
export class LibEventsComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private blogService: BlogService,
    private datePipe: DatePipe,
    private workshopService: WorkshopService,
  ) { }

  ngOnInit(): void {
    this.blogService.getLatest(6).subscribe((blogList: Blog[]) => {
      if (blogList && blogList.length > 0) {
        this.renderBlogList(blogList);
      }
    });
    this.workshopService.getWsList(3).subscribe((wsList: Workshop[]) => {
      if (wsList && wsList.length > 0) {
        this.renderWsList(wsList);
      }
    })
  }

  renderBlogList(blogList: Blog[]) {
    const listContainer = document.getElementById('latest-blogs');
    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    if (listContainer) {
      for (const blog of blogList) {
        let newLi = document.createElement('li');
        newLi.className = 'blog-item';
        newLi.style.paddingTop = '15px';
        newLi.style.paddingBottom = '15px';
        listContainer.appendChild(newLi);
        let newLink = document.createElement('a');
        newLink.className = 'blog-topic';
        newLink.href = `/blog/read/${blog._id}`;
        newLink.innerHTML = `<b>[${blog.category}]</b> ${blog.topic}`;
        newLink.style.fontSize = 'large';
        newLi.appendChild(newLink);
      }
    }
  }

  renderWsList(wsList: Workshop[]) {
    const indContainer = document.querySelector('div.carousel-indicators');
    const slideContainer = document.querySelector('div.carousel-inner');
    while (indContainer.firstChild) {
      indContainer.removeChild(indContainer.firstChild);
    }
    while (slideContainer.firstChild) {
      slideContainer.removeChild(slideContainer.firstChild);
    }
    let index = 0;
    for (const workshop of wsList) {
      //Add carousel indicator for each workshop
      const button1 = document.createElement('button');
      button1.type = 'button';
      button1.setAttribute('data-bs-target', "#workshop-carousel");
      button1.setAttribute('data-bs-slide-to', `${index}`);
      button1.setAttribute('aria-label', `Slide ${index}`);
      if (index == 0) {
        button1.className = 'active';
        button1.setAttribute('aria-current', 'true');
      }
      indContainer.appendChild(button1);
      //Add carousel slide for each workshop
      const wsDiv = document.createElement('div');
      wsDiv.className = 'carousel-item';
      if (index == 0) {
        wsDiv.className += ' active';
      }
      slideContainer.appendChild(wsDiv);
      const wsImg = document.createElement('img');
      wsImg.src = workshop.poster.slice(2,);
      wsImg.className = 'd-block w-100 poster';
      wsImg.alt = 'workshop-poster';
      wsImg.style.width = '80%';
      wsImg.style.height = '320px';
      wsDiv.appendChild(wsImg);
      const wsCapDiv = document.createElement('div');
      wsCapDiv.className = 'carousel-caption d-block';
      wsCapDiv.style.opacity = '0.8';
      wsCapDiv.style.background = 'lightgray';
      wsCapDiv.style.fontSize = 'medium';
      wsCapDiv.style.fontWeight = '600';
      wsDiv.appendChild(wsCapDiv);
      const wsTitle = document.createElement('h3');
      wsTitle.className = 'title';
      wsTitle.style.fontSize = 'large';
      wsTitle.style.color = 'darkblue';
      wsTitle.innerHTML = workshop.topic;
      wsCapDiv.appendChild(wsTitle);
      const wsTime = document.createElement('p');
      const stime = this.datePipe.transform(workshop.startTime, 'short');
      const timeUnit = workshop.duration > 1 ? 'Hours' : 'Hour';
      wsTime.innerHTML = `Time: ${stime} Duration: ${workshop.duration} ${timeUnit}`;
      wsCapDiv.appendChild(wsTime);
      const wsPlace = document.createElement('p');
      wsPlace.innerHTML = `Place: ${workshop.place}`;
      wsCapDiv.appendChild(wsPlace);
      index++;
    }
  }

}
