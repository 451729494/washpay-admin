/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAccountBorrowComponent} from "./userborrow-list.component";
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';

import { NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,AngularFormsModule,ReactiveFormsModule,NgxDatatableModule],
  declarations: [UserAccountBorrowComponent],
  exports: [UserAccountBorrowComponent]
})
export class UserAccountBorrowModule {
}
