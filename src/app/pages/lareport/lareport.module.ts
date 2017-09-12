import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';

import {routing} from "./lareport.routing";

import { LaReport }       from './lareport.component';
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";
import {ChargeorderreportQuery} from "./component/chargeorder/chargeorderreport.component";
import {ChargeorderrepotView} from "./component/chargeorder/chargeorderreportView.component";


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
    NgbDatepickerModule,
    NgxDatatableModule,
    NgxDatatableModule,
    EntityListModule,
    routing
  ],
  declarations: [
    LaReport,
    ChargeorderreportQuery,
    ChargeorderrepotView
  ],entryComponents:[EntityListComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReportModule {
}

