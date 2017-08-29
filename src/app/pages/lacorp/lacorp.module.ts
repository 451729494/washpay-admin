import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';
import { CKEditorModule } from 'ng2-ckeditor';

import { routing }       from './lacorp.routing';
import {LaCorp} from "./lacorp.component";
import {CorpCustomerQuery} from "./components/corp/corp.component";
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";
import {CorpCustomerView} from "./components/corp/corpView";
import {CorpEmployeeQuery} from "./components/employee/employee.component";
import {CorpEmployeeEdit} from "./components/employee/employeeEdit.component";
import {CorpEmployeeView} from "./components/employee/employeeView.component";
import {CorpEmployeeLeave} from "./components/leave/employeeleave.component";
import {CorpEmployeeLeaveEdit} from "./components/leave/employeeleaveEdit.component";
import {CorpEmployeeLeaveView} from "./components/leave/employeeleaveView.component";
import {CorpEmployeeApproved} from "./components/employee/employeeApproved.component";
import {CorpEmployeeLeaveApply} from "./components/leave/employeeleaveApply.component";
import {CorpEmployeeLeaveApproved} from "./components/leave/employeeleaveApproved.component";

import {CorpSelectComponent} from "../custom/corp-list-modal/corp-query.component";
import {CorpSelectModule} from "../custom/corp-list-modal/corp-query.module";
import {EmployeeWorkMonthModule} from "../custom/employee-workmonth-list/employee-workmonth-list.module";
import {EmployeeWorkMonthComponent} from "../custom/employee-workmonth-list/employee-workmonth-list.component";
import {DataImportComponent} from "../custom/dataimport-modal/dataimport-modal.component";
import {DataImportModule} from "../custom/dataimport-modal/dataimport-modal.module";
import {EmployeeCorpSalaryItemComponent} from "../custom/employee-salary-item/employee-salary-item.component";
import {EmployeeCorpSalaryItemModule} from "../custom/employee-salary-item/employee-salary-item.module";
import {UserAccountRecordComponent} from "../custom/user-account-record/user-account-record.component";
import {UserAccountRecordModule} from "../custom/user-account-record/user-account-record.module";
import {EmployeeCorpSalaryComponent} from "../custom/employee-salary-list/employee-salary-list.component";
import {EmployeeCorpSalaryModule} from "../custom/employee-salary-list/employee-salary-list.module";
import {UserAccountBorrowComponent} from "../custom/user-borrow-list/userborrow-list.component";
import {UserAccountDepositComponent} from "../custom/user-deposit-list/userdeposit-list.component";
import {UserAccountBorrowModule} from "../custom/user-borrow-list/userborrow-list.module";
import {UserAccountDepositModule} from "../custom/user-deposit-list/userdeposit-list.module";


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
    EntityListModule,
    CorpSelectModule,
    EmployeeWorkMonthModule,
    DataImportModule,
    EmployeeCorpSalaryItemModule,
    UserAccountRecordModule,
    EmployeeCorpSalaryModule,
    UserAccountBorrowModule,
    UserAccountDepositModule,
    routing
  ],
  declarations: [
    LaCorp,
    CorpCustomerQuery,
    CorpCustomerView,
    CorpEmployeeQuery,
    CorpEmployeeEdit,
    CorpEmployeeView,
    CorpEmployeeLeave,
    CorpEmployeeLeaveEdit,
    CorpEmployeeLeaveView,
    CorpEmployeeApproved,
    CorpEmployeeLeaveApply,
    CorpEmployeeLeaveApproved,
  ],entryComponents:[CorpSelectComponent,DataImportComponent,EntityListComponent,EmployeeWorkMonthComponent,EmployeeCorpSalaryItemComponent,UserAccountRecordComponent,EmployeeCorpSalaryComponent,UserAccountBorrowComponent,UserAccountDepositComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaCorpModule {
}

