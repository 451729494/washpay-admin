import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';

import { routing }       from './laorder.routing';
import {LaOrder} from "./laorder.component";
import {ConsumorderQuery} from "./components/consumorder/consumorder.component";
import {ConsumorderEdit} from "./components/consumorder/consumorderEdit.component";
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";



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
    NgbDatepickerModule.forRoot(),
    NgxDatatableModule,
    EntityListModule,
    routing
  ],
  declarations: [
    LaOrder,
    ConsumorderEdit,
    ConsumorderQuery,
    ConsumorderEdit
  ],entryComponents:[EntityListComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaOrderModule {
}

