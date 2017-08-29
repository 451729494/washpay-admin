import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';

import { LaMsg }       from './lamsg.component';
import {routing} from "./lamsg.routing";

import {PhotoListModule} from "../custom/photo-list-modal/photo-list.module";
import {PhotoModalModule} from "../custom/photo-modal/photo-modal.module";
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";
import {PhotoModalComponent} from "../custom/photo-modal/photo-modal.component";
import {MsgTemplateQuery} from "./components/template/msgTemplate.component";
import {MsgTemplateEdit} from "./components/template/msgTemplateEdit";
import {MsgPushQuery} from "./components/push/msgPush.component";
import {MsgPushEdit} from "./components/push/msgPushEdit.component";
import {MsgPushView} from "./components/push/msgPushView";


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
    PhotoListModule,
    PhotoModalModule,
    EntityListModule,
    routing
  ],
  declarations: [
    LaMsg,
    MsgTemplateQuery,
    MsgTemplateEdit,
    MsgPushQuery,
    MsgPushEdit,
    MsgPushView
  ],entryComponents:[PhotoModalComponent,EntityListComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaMsgModule {
}

