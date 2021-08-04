import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { LibAuthGuard } from '../auth/lib-auth.guard';
import { CreateWorkshopComponent } from './create-workshop/create-workshop.component';
import { UpdateWorkshopComponent } from './update-workshop/update-workshop.component';
import { WorkshopPortalComponent } from './workshop-portal/workshop-portal.component';

const workshopRoutes: Routes = [
  {
    path: 'workshop/create',
    canActivate: [LibAuthGuard],
    component: CreateWorkshopComponent,
  },
  {
    path: 'workshop/update',
    canActivate: [LibAuthGuard],
    component: UpdateWorkshopComponent,
  },
  {
    path: 'workshop',
    canActivate: [LibAuthGuard],
    component: WorkshopPortalComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(workshopRoutes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule { }
