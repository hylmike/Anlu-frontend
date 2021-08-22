import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ReaderAuthService } from '../../auth/reader-auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { CommonService } from '../../common/common.service';
import { Subscriber, SubWorkshopDto, Workshop } from '../../common/workshop.dto';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-workshop-portal',
  templateUrl: './workshop-portal.component.html',
  styleUrls: ['./workshop-portal.component.css']
})
export class WorkshopPortalComponent implements OnInit {

  readerID = '';

  constructor(
    private logger: NGXLogger,
    private readerAuthService: ReaderAuthService,
    private commonService: CommonService,
    private tokenService: TokenStorageService,
    private workshopService: WorkshopService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.readerAuthService.isLoggedIn()) {
      //set the reader name in header
      const readerName = this.tokenService.getUsername();
      this.commonService.setSubject(readerName);
      this.readerID = this.readerAuthService.getReaderID();
    }
    //create workshop list and render into webpage
    this.workshopService.getAllWorkshop().subscribe((workshopList: Workshop[]) => {
      const comingWS = document.querySelector('div.coming-workshop') as HTMLDivElement;
      const finishedWS = document.querySelector('div.finished-workshop') as HTMLDivElement;
      if (workshopList && workshopList.length > 0) {
        const now = new Date();
        for (const workshop of workshopList) {
          workshop.startTime = new Date(workshop.startTime);
          if (workshop.startTime > now) {
            this.loadWSCard(comingWS, workshop);
          } else {
            this.loadWSCard(finishedWS, workshop);
          }
        }
        this.logger.info('Success loaded all workshop cards')
      } else if (workshopList && workshopList.length === 0) {
        let emptyInfo = document.createElement('p');
        emptyInfo.innerHTML = 'Nothing was planned yet, please wait ...';
        emptyInfo.style.textAlign = 'center';
        emptyInfo.style.fontFamily = "'Times New Roman', Times, serif";
        emptyInfo.style.fontSize = 'x-large';
        emptyInfo.style.fontWeight = '600';
        comingWS.appendChild(emptyInfo);
        finishedWS.style.display = 'none';
        this.logger.info('Success updated workshop portal with empty list')
      } else {
        this.logger.warn('Something worng in service side');
      }

    });
  }

  loadWSCard(wsDiv: HTMLDivElement, workshop: Workshop) {
    let colDiv = document.createElement('div');
    colDiv.className = 'col-md-4';
    wsDiv.appendChild(colDiv);
    let cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.height = '400px';
    colDiv.appendChild(cardDiv);
    let cardImg = document.createElement('img');
    cardImg.src = workshop.poster.slice(2,);
    cardImg.className = 'workshop-pic';
    cardImg.alt = 'workshop-poster';
    cardImg.style.width = '80%';
    cardImg.style.height = '250px';
    cardDiv.appendChild(cardImg);
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    let cardTitle = document.createElement('h4');
    cardTitle.className = 'card-title';
    cardTitle.style.fontWeight = '600';
    cardTitle.innerHTML = workshop.topic;
    cardBody.appendChild(cardTitle);
    let cardText1 = document.createElement('p');
    cardText1.className = 'card-text';
    const timeUnit = (workshop.duration > 1) ? 'hours' : 'hour';
    cardText1.innerHTML = `Time: ${workshop.startTime.toLocaleString()} Duration: ${workshop.duration} ${timeUnit}`;
    cardBody.appendChild(cardText1);
    let cardText2 = document.createElement('p');
    cardText2.className = 'card-text';
    cardText2.innerHTML = `Place: ${workshop.place}`;
    cardBody.appendChild(cardText2);
    //Add sub/unsub button if it is coming workshop
    if (wsDiv.className.includes('coming-workshop')) {
      let subDiv = document.createElement('div');
      subDiv.className = 'button-area';
      cardBody.appendChild(subDiv);
      let subButton = document.createElement('button');
      subButton.id = 'sub-button';
      subButton.addEventListener('click', this.subWorkshop.bind(this, workshop._id));
      subButton.innerHTML = 'Subscribe';
      subButton.style.marginRight = '20px';
      subButton.style.borderRadius = '5px';
      subDiv.appendChild(subButton);
      let unsubButton = document.createElement('button');
      unsubButton.id = 'unsub-button';
      unsubButton.addEventListener('click', this.unsubWorkshop.bind(this, workshop._id));
      unsubButton.innerHTML = 'Unsubscribe';
      unsubButton.style.borderRadius = '5px';
      subDiv.appendChild(unsubButton);
      //Update button className with reader subscription status
      unsubButton.disabled = true;
      this.workshopService.getSubList(workshop._id).subscribe((subList: Subscriber[]) => {
        if (subList && subList.length > 0) {
          const subReaderList = subList.map((record) => record.readerID);
          if (this.readerID !== '') {
            if (subReaderList.includes(this.readerID)) {
              subButton.disabled = true;
              unsubButton.disabled = false;
            }
          } else {
            this.logger.warn(`Get subscriber list of workshop ${workshop._id} failed`);
          }
        }
      });
    }
  }

  subWorkshop(workshopID: string) {
    if (this.readerID !== '') {
      const subWsDto: SubWorkshopDto = {
        workshop: workshopID,
        readerID: this.readerID,
      }
      this.workshopService.subWorkshop(subWsDto).subscribe((sub) => {
        if (sub) {
          this.logger.info(`Success subscribed reader ${this.readerID} for workshop ${workshopID}`);
          (document.getElementById('sub-button') as HTMLButtonElement).disabled = true;
          (document.getElementById('unsub-button') as HTMLButtonElement).disabled = false;
        } else {
          this.logger.warn(`Failed to subscribe reader ${this.readerID} for workshop ${workshopID}`)
        }
      });
    } else {
      window.alert('Please login before subscribe the workshop');
      this.readerAuthService.redirectUrl = '/workshop';
      this.router.navigateByUrl('/reader/login');
    }
  }

  unsubWorkshop(workshopID: string) {
    this.workshopService.getSub(this.readerID).subscribe((sub) => {
      if (sub) {
        const unsubWsDto = { subID: sub._id };
        this.workshopService.unsubWorkshop(workshopID, unsubWsDto).subscribe((subID) => {
          if (subID == sub._id) {
            this.logger.info(`Success unsubscribed reader ${this.readerID} from workshop ${workshopID}`);
            (document.getElementById('sub-button') as HTMLButtonElement).disabled = false;
            (document.getElementById('unsub-button') as HTMLButtonElement).disabled = true;
          } else {
            this.logger.info(`Failed to unsubscribe reader ${this.readerID} from workshop ${workshopID}`)
          }
        })
      }
    });
  }

  ngOnDestroy() {
    const subButtons = document.querySelectorAll('button.sub-button');
    if (subButtons && subButtons.length > 0) {
      for (let i = 0; i < subButtons.length; i++) {
        subButtons[i].replaceWith(subButtons[i].cloneNode(true));
      }
    }
    this.logger.info('Success cleaned all eventListeners added by workshop-portal component');
  }

}
