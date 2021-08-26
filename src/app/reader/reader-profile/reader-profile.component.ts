import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { Reader } from '../../common/reader.dto';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-reader-profile',
  templateUrl: './reader-profile.component.html',
  styleUrls: ['./reader-profile.component.css']
})
export class ReaderProfileComponent implements OnInit {

  reader: Reader;

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private readerAuthService: ReaderAuthService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    const readerID = this.route.snapshot.paramMap.get('id');
    this.readerAuthService.getReader(readerID).subscribe((data) => {
      if (data) {
        this.reader = data;
        this.commonService.setSubject(this.reader.username);
        this.logger.info(`Success get reader ${readerID} profile from backend`);
      }
      else {
        this.logger.warn(`Get reader ${readerID} from backend failed`);
      }
    })
  }

}
