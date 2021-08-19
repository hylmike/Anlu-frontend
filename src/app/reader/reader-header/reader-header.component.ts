import { Component, OnInit } from '@angular/core';
import { ReaderAuthService } from 'src/app/auth/reader-auth.service';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-reader-header',
  templateUrl: './reader-header.component.html',
  styleUrls: ['./reader-header.component.css']
})
export class ReaderHeaderComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private readerAuthService: ReaderAuthService,
    ) { }

  titleName: string = 'Anlu BiBlio';

  userName: string = 'Our Guest';

  isSignedIn: boolean = false;

  profileUrl: string = '#';

  ngOnInit(): void {
    this.commonService.usernameUpdate.subscribe((username)=>{
      this.userName = username;
    })
    if (!this.userName) {this.userName = 'Our Guest'}
    this.isSignedIn = this.readerAuthService.isLoggedIn();
    if (this.isSignedIn) {
      const readerID = this.readerAuthService.getReaderID();
      this.profileUrl = `/reader/${readerID}/profile`;
    }
  }

}
