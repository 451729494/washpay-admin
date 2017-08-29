/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CorpSelectComponent} from "./corp-query.component";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,  FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [CorpSelectComponent],
  exports: [CorpSelectComponent]
})

export class CorpSelectModule {
}
