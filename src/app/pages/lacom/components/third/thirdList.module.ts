import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SysThirdListComponent} from "./thirdList.component";

import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,NgbModalModule,NgxDatatableModule],
  declarations: [SysThirdListComponent],
  exports: [SysThirdListComponent]
})
export class SysThirdListModule {
}
