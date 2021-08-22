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

@NgModule({
  declarations: [
    CreateWorkshopComponent,
    UpdateWorkshopComponent,
    WorkshopPortalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    ShareModule,
    WorkshopRoutingModule,
    ReaderModule,
  ]
})
export class WorkshopModule { }
