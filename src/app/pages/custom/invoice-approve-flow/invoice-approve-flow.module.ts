/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InvoiceApproveFlowComponent} from "./invoice-approve-flow.component";

import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,NgxDatatableModule],
  declarations: [InvoiceApproveFlowComponent],
  exports: [InvoiceApproveFlowComponent]
})
export class InvoiceApproveFlowModule {
}
