import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoggerModule } from 'ngx-logger';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//import { HomeComponent } from './share/home/home.component';
import { ReaderModule } from './reader/reader.module';
import { httpInterceptorProviders } from './http-Intercepters/index';
import { BookModule } from './book/book.module';
import { HttpErrorHandler } from './common/http-error-handler.service';
import { ReaderAuthService } from './auth/reader-auth.service';
import { LibrarianAuthService } from './auth/librarian-auth.service';
import { AdminAuthService } from './auth/admin-auth.service';
import { environment } from 'src/environments/environment';
import { ShareModule } from './share/share.module';
import { WorkshopModule } from './workshop/workshop.module';
import { BlogModule } from './blog/blog.module';
import { OperationLogModule } from './operation-log/operation-log.module';
import { ChartsModule } from 'ng2-charts';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReaderModule,
    BookModule,
    WorkshopModule,
    BlogModule,
    OperationLogModule,
    ShareModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LoggerModule.forRoot({
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
      serverLoggingUrl: `${environment.apiUrl}api/log`,
      disableConsoleLogging: false,
    }),
    ChartsModule,
  ],
  providers: [
    httpInterceptorProviders,
    HttpErrorHandler,
    ReaderAuthService,
    LibrarianAuthService,
    AdminAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
