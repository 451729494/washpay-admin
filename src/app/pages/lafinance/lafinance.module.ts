import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';
import { CKEditorModule } from 'ng2-ckeditor';

import { routing }       from './lafinance.routing';
import {LaFinance} from "./lafinance.component";
import {AccountConst} from "./components/actconst/accountconst.component";
import {AccountConstEdit} from "./components/actconst/accountconstEdit.component";
import {AccountPositionEdit} from "./components/actposition/accountpositionEdit.component";
import {AccountPosition} from "./components/actposition/accountposition.component";
import {PhotoModalModule} from "../custom/photo-modal/photo-modal.module";
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";
import {PhotoModalComponent} from "../custom/photo-modal/photo-modal.component";
import {AccountItemQuery} from "./components/actitem/accountItem.component";
import {AccountItemEdit} from "./components/actitem/accountItemEdit.component";
import {AccountPositionView} from "./components/actposition/accountpositionView.component";
import {AccountPositionItemEdit} from "./components/actposition/accountpositionItemEdit.component";
import {CorpExpeseInvoice} from "./components/expense/expeseinvoice.component";
import {CorpExpeseInvoiceEdit} from "./components/expense/expeseinvoiceEdit.component";
import {CorpExpeseInvoiceView} from "./components/expense/expeseinvoiceView.component";
import {CorpExpeseMonthItemEdit} from "./components/expense/expeseItemEdit.component";
import {UserAccountDeposit} from "./components/deposit/depositinvoice.component";
import {UserAccountDepositView} from "./components/deposit/depositinvoiceView.component";
import {UserAccountBorrow} from "./components/borrow/borrowinvoice.component";
import {UserAccountBorrowEdit} from "./components/borrow/borrowinvoiceEdit.component";
import {UserAccountBorrowView} from "./components/borrow/borrowinvoiceView.component";
import {CorpSalaryInvoice} from "./components/salary/salaryinvoice.component";
import {CorpSalaryInvoiceView} from "./components/salary/salaryinvoiceView.component";
import {CorpSalaryInvoiceEdit} from "./components/salary/salaryinvoiceEdit.component";
import {UserAccountBorrowApply} from "./components/borrow/borrowinvoiceApply.component";
import {UserAccountBorrowApproved} from "./components/borrow/borrowinvoiceApproved.component";
import {CorpSalaryInvoiceApply} from "./components/salary/salaryinvoiceApply.component";
import {CorpSalaryInvoiceApproved} from "./components/salary/salaryinvoiceApproved.component";
import {CorpExpeseInvoiceApply} from "./components/expense/expeseinvoiceApply.component";
import {CorpExpeseInvoiceApproved} from "./components/expense/expeseinvoiceApproved.component";
import {EmployeeWorkDay} from "./components/workday/employeeWorkDay.component";
import {EmployeeMeal} from "./components/meal/employeeMeal.component";
import {ManageCostInvoice} from "./components/managecost/managecostinvoice.component";
import {ManageCostInvoiceApply} from "./components/managecost/managecostinvoiceApply.component";
import {ManageCostInvoiceApproved} from "./components/managecost/managecostinvoiceApproved.component";
import {ManageCostInvoiceEdit} from "./components/managecost/managecostinvoiceEdit.component";
import {ManageCostInvoiceView} from "./components/managecost/managecostinvoiceView.component";
import {ManageCostMonthItemEdit} from "./components/managecost/managecostItemEdit.component";
import {EmployeeCorpSalaryItemComponent} from "../custom/employee-salary-item/employee-salary-item.component";
import {EmployeeCorpSalaryItemModule} from "../custom/employee-salary-item/employee-salary-item.module";
import {EmployeeWorkMonthComponent} from "../custom/employee-workmonth-list/employee-workmonth-list.component";
import {EmployeeWorkMonthModule} from "../custom/employee-workmonth-list/employee-workmonth-list.module";
import {DataImportComponent} from "../custom/dataimport-modal/dataimport-modal.component";
import {DataImportModule} from "../custom/dataimport-modal/dataimport-modal.module";


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
    PhotoModalModule,
    EntityListModule,
    EmployeeCorpSalaryItemModule,
    EmployeeWorkMonthModule,
    DataImportModule,
    routing
  ],
  declarations: [
    LaFinance,
    AccountPosition,
    AccountConst,
    AccountConstEdit,
    AccountPositionEdit,
    AccountItemQuery,
    AccountItemEdit,
    AccountPositionView,
    AccountPositionItemEdit,
    CorpExpeseInvoice,
    CorpExpeseInvoiceEdit,
    CorpExpeseInvoiceView,
    CorpExpeseMonthItemEdit,
    UserAccountDeposit,
    UserAccountDepositView,
    UserAccountBorrow,
    UserAccountBorrowEdit,
    UserAccountBorrowView,
    CorpSalaryInvoice,
    CorpSalaryInvoiceView,
    CorpSalaryInvoiceEdit,
    UserAccountBorrowApply,
    UserAccountBorrowApproved,
    CorpSalaryInvoiceApply,
    CorpSalaryInvoiceApproved,
    CorpExpeseInvoiceApply,
    CorpExpeseInvoiceApproved,
    EmployeeWorkDay,
    EmployeeMeal,
    ManageCostInvoice,
    ManageCostInvoiceApply,
    ManageCostInvoiceApproved,
    ManageCostInvoiceEdit,
    ManageCostInvoiceView,
    ManageCostMonthItemEdit
  ],entryComponents:[PhotoModalComponent,DataImportComponent,EntityListComponent,EmployeeCorpSalaryItemComponent,EmployeeWorkMonthComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaFinanceModule {
}

