import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { LogReviewComponent } from './log-review/log-review.component';

const logRoutes: Routes = [
  {
    path: 'operationlog/review',
    canActivate: [AdminAuthGuard],
    component: LogReviewComponent,
  },
  {
    path: 'operationlog',
    redirectTo: 'operationlog/review',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(logRoutes)],
  exports: [RouterModule]
})
export class OperationLogRoutingModule { }
