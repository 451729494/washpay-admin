/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeWorkMonthComponent} from "./employee-workmonth-list.component";

import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,ReactiveFormsModule,
    AngularFormsModule,NgxDatatableModule],
  declarations: [EmployeeWorkMonthComponent],
  exports: [EmployeeWorkMonthComponent]
})
export class EmployeeWorkMonthModule {
}
