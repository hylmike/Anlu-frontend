import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationLogRoutingModule } from './operation-log-routing.module';
import { LogReviewComponent } from './log-review/log-review.component';


@NgModule({
  declarations: [
    LogReviewComponent
  ],
  imports: [
    CommonModule,
    OperationLogRoutingModule
  ]
})
export class OperationLogModule { }
