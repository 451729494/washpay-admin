/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';

import {EmployeeCorpSalaryComponent} from "./employee-salary-list.component";

import { NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,ReactiveFormsModule,
    AngularFormsModule,NgxDatatableModule],
  declarations: [EmployeeCorpSalaryComponent],
  exports: [EmployeeCorpSalaryComponent]
})
export class EmployeeCorpSalaryModule {
}
