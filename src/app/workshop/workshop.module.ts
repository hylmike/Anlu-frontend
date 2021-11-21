import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { CreateWorkshopComponent } from './create-workshop/create-workshop.component';
import { UpdateWorkshopComponent } from './update-workshop/update-workshop.component';
import { WorkshopPortalComponent } from './workshop-portal/workshop-portal.component';
import { ShareModule } from '../share/share.module';
import { ReaderModule } from '../reader/reader.module';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { WorkshopManageComponent } from './workshop-manage/workshop-manage.component';
import { WorkshopInfoComponent } from './workshop-info/workshop-info.component';
import { WorkshopListComponent } from './workshop-list/workshop-list.component';
import { LibModule } from '../librarian/lib.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateWorkshopComponent,
    UpdateWorkshopComponent,
    WorkshopPortalComponent,
    WorkshopManageComponent,
    WorkshopInfoComponent,
    WorkshopListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    ShareModule,
    LibModule,
    WorkshopRoutingModule,
    ReaderModule,
    TranslateModule,
  ]
})
export class WorkshopModule { }
