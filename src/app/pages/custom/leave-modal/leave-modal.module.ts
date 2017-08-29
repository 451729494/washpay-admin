/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LeaveApplyComponent} from "./leave-modal.component";

import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';

import { NgbModalModule,NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule,ReactiveFormsModule,
    AngularFormsModule, NgbDatepickerModule],
  declarations: [LeaveApplyComponent],
  exports: [LeaveApplyComponent]
})
export class LeaveApplyModule {
}
