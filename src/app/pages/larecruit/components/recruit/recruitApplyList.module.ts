import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecruitApplyListComponent} from "./recruitApplyList.component";

import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,NgbModalModule,NgxDatatableModule],
  declarations: [RecruitApplyListComponent],
  exports: [RecruitApplyListComponent]
})
export class RecruitApplyListModule {
}
