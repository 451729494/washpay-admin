/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';

import {EmployeeExpeseMonthComponent} from "./employee-expese-month.component";


import { NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,ReactiveFormsModule,
    AngularFormsModule,NgxDatatableModule],
  declarations: [EmployeeExpeseMonthComponent],
  exports: [EmployeeExpeseMonthComponent]
})
export class EmployeeExpeseMonthModule {
}
