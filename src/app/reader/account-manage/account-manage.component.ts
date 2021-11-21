import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { Reader } from 'src/app/common/reader.dto';

@Component({
  selector: 'app-account-manage',
  templateUrl: './account-manage.component.html',
  styleUrls: ['./account-manage.component.css'],
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
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    const adminName = this.tokenService.getUsername().slice(3);
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
    });
  }

  reviewAccount(readerID: string) {
    this.router.navigateByUrl(`/reader/mprofile/${readerID}`);
  }

  deaAccount(readerID: string) {
    let deaNotice1:string, deaNotice2: string;
    this.translate
      .stream(['readerManage.deaNotice-1', 'readerManage.deaNotice-2'], {
        id: readerID,
      })
      .subscribe((res) => {
        deaNotice1 = res['readerManage.deaNotice-1'];
        deaNotice2 = res['readerManage.deaNotice-2'];
      });
    if (window.confirm(deaNotice1)) {
      this.readerAuthService.deaReader(readerID).subscribe((data) => {
        if (data == false) {
          this.logger.info(`Success deavtivate the reader ${readerID}`);
          window.alert(deaNotice2);
          this.reloadPage();
        } else {
          this.logger.warn(`Failed to deavtivate the reader ${readerID}`);
        }
      });
    }
  }

  actAccount(readerID: string) {
    let actNotice1:string, actNotice2: string;
    this.translate
      .stream(['readerManage.actNotice-1', 'readerManage.actNotice-2'], {
        id: readerID,
      })
      .subscribe((res) => {
        actNotice1 = res['readerManage.actNotice-1'];
        actNotice2 = res['readerManage.actNotice-2'];
      });
    if (window.confirm(actNotice1)) {
      this.readerAuthService.actReader(readerID).subscribe((data) => {
        if (data == true) {
          this.logger.info(`Success activated the reader ${readerID}`);
          window.alert(actNotice2);
          this.reloadPage();
        } else {
          this.logger.warn(`Failed to activate the reader ${readerID}`);
        }
      });
    }
  }

  delAccount(readerID: string) {
    let delNotice1:string, delNotice2: string;
    this.translate
      .stream(['readerManage.delNotice-1', 'readerManage.delNotice-2'], {
        id: readerID,
      })
      .subscribe((res) => {
        delNotice1 = res['readerManage.delNotice-1'];
        delNotice2 = res['readerManage.delNotice-2'];
      });
    if (
      window.confirm(delNotice1)
    ) {
      this.readerAuthService.delReader(readerID).subscribe((data) => {
        if (data) {
          window.alert(delNotice2);
          this.logger.info(`Success delete reader ${readerID} from database`);
          this.reloadPage();
        } else {
          this.logger.warn(`Failed to delete reader ${readerID} from server`);
        }
      });
    }
  }

  reloadPage() {
    location.reload();
  }
}
