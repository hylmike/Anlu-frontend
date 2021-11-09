import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { LibrarianAuthService } from 'src/app/auth/librarian-auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common/common.service';
import { Librarian } from 'src/app/common/lib.dto';

@Component({
  selector: 'app-lib-profile',
  templateUrl: './lib-profile.component.html',
  styleUrls: ['./lib-profile.component.css']
})
export class LibProfileComponent implements OnInit {

  libProfile: Librarian;
  libUpdateUrl = '#';
  libChangePwdUrl = '#';

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private libAuthService: LibrarianAuthService,
    private tokenService: TokenStorageService,
    private commonService: CommonService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const libID = this.route.snapshot.paramMap.get('id');
    this.libUpdateUrl = `/lib/update/${libID}`;
    this.libChangePwdUrl = `/lib/changepwd/${libID}`;
    const libName = this.tokenService.getUsername().slice(3,);
    this.commonService.setSubject(libName);
    this.libAuthService.getProfile(libID).subscribe((lib: Librarian)=>{
      if (lib) {
        this.libProfile = lib;
        this.logger.info(`Success get profile of ${lib.role} ${lib.username}`);
      }
    })
  }

}
