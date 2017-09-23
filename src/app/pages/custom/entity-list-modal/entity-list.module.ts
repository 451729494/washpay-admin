/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {EntityListComponent} from "./entity-list.component";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NgbModalModule,NgxDatatableModule],
  declarations: [EntityListComponent],
  entryComponents:[EntityListComponent],
  exports: [EntityListComponent]
})
export class EntityListModule {
}
