/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAccountRecordComponent} from "./user-account-record.component";

import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';

import { NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,AngularFormsModule,ReactiveFormsModule,NgxDatatableModule],
  declarations: [UserAccountRecordComponent],
  exports: [UserAccountRecordComponent]
})
export class UserAccountRecordModule {
}
