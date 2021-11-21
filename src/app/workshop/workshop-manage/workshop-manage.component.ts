import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-workshop-manage',
  templateUrl: './workshop-manage.component.html',
  styleUrls: ['./workshop-manage.component.css']
})
export class WorkshopManageComponent implements OnInit {

  constructor(
    private tokenService: TokenStorageService,
    private commonServie: CommonService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const libName = this.tokenService.getUsername().slice(3,);
    this.commonServie.setSubject(libName);
  }

}
