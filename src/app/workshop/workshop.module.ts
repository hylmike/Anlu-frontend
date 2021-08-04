import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { CreateWorkshopComponent } from './create-workshop/create-workshop.component';
import { UpdateWorkshopComponent } from './update-workshop/update-workshop.component';
import { WorkshopPortalComponent } from './workshop-portal/workshop-portal.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [
    CreateWorkshopComponent,
    UpdateWorkshopComponent,
    WorkshopPortalComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    WorkshopRoutingModule,
  ]
})
export class WorkshopModule { }
