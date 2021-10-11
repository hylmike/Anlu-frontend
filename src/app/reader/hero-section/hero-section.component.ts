import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Workshop } from 'src/app/common/workshop.dto';
import { WorkshopService } from 'src/app/workshop/workshop.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private workshopService: WorkshopService,
  ) { }

  ngOnInit(): void {
    
    this.workshopService.getWsList(3).subscribe((wsList: Workshop[]) => {
      if (wsList && wsList.length > 0) {
        this.renderWsList(wsList);
        this.logger.info('Success render Workshop List');
      }
    })
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
      index++;
    }
  }
  
}
