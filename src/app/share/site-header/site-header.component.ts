import { Component, OnInit } from '@angular/core';
import { AuthModule } from 'src/app/auth/auth.module';

import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  titleName: string = 'Anlu Library';

  userName: string = 'Our Guest';

  ngOnInit(): void {
    this.commonService.usernameUpdate.subscribe((username)=>{
      this.userName = username;
    })
    if (!this.userName) {this.userName = 'Our Guest'}
  }

}
