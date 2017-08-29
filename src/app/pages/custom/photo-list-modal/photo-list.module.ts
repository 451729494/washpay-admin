/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhotoListComponent} from "./photo-list.component";

import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule,NgbModalModule,NgxDatatableModule],
  declarations: [PhotoListComponent],
  exports: [PhotoListComponent]
})
export class PhotoListModule {
}
