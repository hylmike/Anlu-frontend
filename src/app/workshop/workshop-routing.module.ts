import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibAuthGuard } from '../auth/lib-auth.guard';
import { ReaderAuthGuard } from '../auth/reader-auth.guard';
import { CreateWorkshopComponent } from './create-workshop/create-workshop.component';
import { UpdateWorkshopComponent } from './update-workshop/update-workshop.component';
import { WorkshopInfoComponent } from './workshop-info/workshop-info.component';
import { WorkshopManageComponent } from './workshop-manage/workshop-manage.component';
import { WorkshopPortalComponent } from './workshop-portal/workshop-portal.component';

const workshopRoutes: Routes = [
  {
    path: 'workshop/create',
    canActivate: [LibAuthGuard],
    component: CreateWorkshopComponent,
  },
  {
    path: 'workshop/update/:id',
    canActivate: [LibAuthGuard],
    component: UpdateWorkshopComponent,
  },
  {
    path: 'workshop/manage',
    canActivate: [LibAuthGuard],
    component: WorkshopManageComponent,
  },
  {
    path: 'workshop/reviewinfo/:id',
    canActivate: [LibAuthGuard],
    component: WorkshopInfoComponent,
  },
  {
    path: 'workshop',
    canActivate: [ReaderAuthGuard],
    component: WorkshopPortalComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(workshopRoutes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule { }
