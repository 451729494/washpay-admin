/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAccountDepositComponent} from "./userdeposit-list.component";

import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';

import { NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,AngularFormsModule,ReactiveFormsModule,NgxDatatableModule],
  declarations: [UserAccountDepositComponent],
  exports: [UserAccountDepositComponent]
})
export class UserAccountDepositModule {
}
