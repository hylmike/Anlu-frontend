import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private logger: NGXLogger, public translate: TranslateService) {
    const supportLangs = ['en', 'fr'];
    translate.addLangs(supportLangs);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.logger.info('Success started frontend server!');
  }
}
