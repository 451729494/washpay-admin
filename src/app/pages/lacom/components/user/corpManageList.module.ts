import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CorpManageListComponent} from "./corpManageList.component";

import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,NgbModalModule,NgxDatatableModule],
  declarations: [CorpManageListComponent],
  exports: [CorpManageListComponent]
})
export class CorpManageListModule {
}
