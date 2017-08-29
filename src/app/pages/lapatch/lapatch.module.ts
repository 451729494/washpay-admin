import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';
import { CKEditorModule } from 'ng2-ckeditor';

import { routing }       from './lapatch.routing';
import {LaPatch} from "./lapatch.component";

import {PhotoListModule} from "../custom/photo-list-modal/photo-list.module";
import {PhotoModalModule} from "../custom/photo-modal/photo-modal.module";
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";
import {PhotoModalComponent} from "../custom/photo-modal/photo-modal.component";
import {PatchEmployeeQuery} from "./components/employee/employee.component";
import {PatchServiceQuery} from "./components/service/patchService.component";
import {PatchCustomerQuery} from "./components/customer/patchCustomer.component";
import {PatchEmployeeView} from "./components/employee/employeeView.component";


import {UserAccountRecordComponent} from "../custom/user-account-record/user-account-record.component";
import {UserAccountRecordModule} from "../custom/user-account-record/user-account-record.module";
import {EmployeeCorpSalaryComponent} from "../custom/employee-salary-list/employee-salary-list.component";
import {EmployeeCorpSalaryModule} from "../custom/employee-salary-list/employee-salary-list.module";
import {UserAccountBorrowComponent} from "../custom/user-borrow-list/userborrow-list.component";
import {UserAccountDepositComponent} from "../custom/user-deposit-list/userdeposit-list.component";
import {UserAccountBorrowModule} from "../custom/user-borrow-list/userborrow-list.module";
import {UserAccountDepositModule} from "../custom/user-deposit-list/userdeposit-list.module";
import {EmployeeWorkMonthModule} from "../custom/employee-workmonth-list/employee-workmonth-list.module";
import {EmployeeWorkMonthComponent} from "../custom/employee-workmonth-list/employee-workmonth-list.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    NgbTabsetModule.forRoot(),
    NgUploaderModule,
    NgbDatepickerModule,
    CKEditorModule,
    NgxDatatableModule,
    PhotoListModule,
    PhotoModalModule,
    EntityListModule,
    UserAccountRecordModule,
    EmployeeCorpSalaryModule,
    UserAccountBorrowModule,
    UserAccountDepositModule,
    EmployeeWorkMonthModule,
    routing
  ],
  declarations: [
    LaPatch,
    PatchEmployeeQuery,
    PatchServiceQuery,
    PatchCustomerQuery,
    PatchEmployeeView
  ],entryComponents:[PhotoModalComponent,EntityListComponent,EmployeeWorkMonthComponent,EmployeeCorpSalaryComponent,UserAccountBorrowComponent,UserAccountDepositComponent,UserAccountRecordComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaPatchModule {
}

