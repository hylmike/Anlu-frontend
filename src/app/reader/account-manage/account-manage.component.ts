import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { Reader } from 'src/app/common/reader.dto';

@Component({
  selector: 'app-account-manage',
  templateUrl: './account-manage.component.html',
  styleUrls: ['./account-manage.component.css']
})
export class AccountManageComponent implements OnInit {

  readerList: Reader[];
  p: number = 1;

  constructor(
    private logger: NGXLogger,
    private readerAuthService: ReaderAuthService,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const adminName = this.tokenService.getUsername().slice(3,);
    this.commonService.setSubject(adminName);
    this.readerAuthService.getAllReader().subscribe((rList: Reader[]) => {
      if (rList && rList.length > 0) {
        this.readerList = [].concat(rList);
        this.logger.info('Success get all reader list from backend');
      } else if (rList && rList.length == 0) {
        this.logger.info('No reader data in database');
      } else {
        this.logger.warn('Failed to get reader data from backend');
      }
    })
  }

  reviewAccount(readerID: string) {
    this.router.navigateByUrl(`/lib/reviewreader/${readerID}`);
  }

  deaAccount(readerID: string) {
    if (window.confirm('Please confirm if you want to deactivate the reader')) {
      this.readerAuthService.deaReader(readerID).subscribe((data)=>{
        if (data==false) {
          this.logger.info(`Success deavtivate the reader ${readerID}`);
          window.alert(`Success deavtivated the reader ${readerID}`);
          this.reloadPage();
        } else {
          this.logger.warn(`Failed to deavtivate the reader ${readerID}`);
        }
      })
    }
  }

  actAccount(readerID: string) {
    if (window.confirm('Please confirm if you want to activate the reader')) {
      this.readerAuthService.actReader(readerID).subscribe((data)=>{
        if (data==true) {
          this.logger.info(`Success activated the reader ${readerID}`);
          window.alert(`Success avtivated the reader ${readerID}`);
          this.reloadPage();
        } else {
          this.logger.warn(`Failed to activate the reader ${readerID}`);
        }
      })
    }
  }

  delAccount(readerID: string) {
    if (window.confirm('Be careful to delete reader, CAN NOT recover! Please confirm')) {
      this.readerAuthService.delReader(readerID).subscribe((data) => {
        if (data) {
          window.alert(`Success delete reader ${readerID} from server`)
          this.logger.info(`Success delete reader ${readerID} from database`);
          this.reloadPage();
        } else {
          this.logger.warn(`Failed to delete reader ${readerID} from server`);
        }
      })
    }
  }

  reloadPage() {
    location.reload();
  }
}
