import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { Workshop } from 'src/app/common/workshop.dto';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-workshop-info',
  templateUrl: './workshop-info.component.html',
  styleUrls: ['./workshop-info.component.css']
})
export class WorkshopInfoComponent implements OnInit {

  workshop: Workshop;
  wsUpdateUrl: string = '#';
  subList = [];

  constructor(
    private logger: NGXLogger,
    private workshopService: WorkshopService,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const libName = this.tokenService.getUsername().slice(3,);
    this.commonService.setSubject(libName);
    const workshopID = this.route.snapshot.paramMap.get('id');
    this.workshopService.getWorkshop(workshopID).subscribe((wsData: Workshop) => {
      if (wsData && wsData.topic) {
        this.workshop = wsData;
        this.workshop.poster = this.workshop.poster.slice(14,);
        this.wsUpdateUrl = `/workshop/update/${workshopID}`;
        this.subList = [];
        if (this.workshop.subscriber.length > 0) {
          for (const item of this.workshop.subscriber) {
            this.workshopService.getSubName(item).subscribe((readerName) => {
              if (readerName) this.subList.push(` ${readerName}`);
            })
          }
        }
        this.logger.info(`Success to get workshop ${workshopID} from server`);
      } else {
        this.logger.warn(`Failed to get workshop ${workshopID} from server`);
      }
    })
  }

}
