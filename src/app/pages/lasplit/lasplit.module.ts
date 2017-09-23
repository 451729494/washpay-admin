import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';
import {DefaultModal} from "./components/modal/default-modal.component";

import { routing }       from './lasplit.routing';
import {Lasplit} from "./lasplit.component";
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";

import {SplitQuery} from "./components/split.component";
import {SplitCommercialQuery} from "./components/splitComm.component";
import {SplitManagerQuery} from "./components/splitManager.component";
import {SplitBranchQuery} from "./components/splitbranch.component";


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
    Lasplit,
    SplitQuery,
    SplitCommercialQuery,
    SplitManagerQuery,
    SplitBranchQuery,
    DefaultModal
  ],entryComponents:[EntityListComponent,DefaultModal],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SplitModule {
}

