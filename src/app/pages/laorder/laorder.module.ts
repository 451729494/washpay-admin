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
import {ChargeorderQuery} from "./components/chargeorder/chargeorder.compenent";
import {ConsumorderEdit} from "./components/consumorder/consumorderEdit.component";
import {ConsumorderView} from "./components/consumorder/consumorderView.component";



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
    routing
  ],
  declarations: [
    LaOrder,
    ConsumorderEdit,
    ConsumorderQuery,
    ConsumorderView,
    ChargeorderQuery
  ],entryComponents:[],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaOrderModule {
}

