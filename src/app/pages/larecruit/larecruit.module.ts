import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';
import { CKEditorModule } from 'ng2-ckeditor';

import { routing }       from './larecruit.routing';
import {LaRecruit} from "./larecruit.component";
import {RecruitQuery} from "./components/recruit/recruit.component";
import {RecruitEdit} from "./components/recruit/recruitEdit.component";

import {PhotoListModule} from "../custom/photo-list-modal/photo-list.module";
import {PhotoModalModule} from "../custom/photo-modal/photo-modal.module";
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";
import {PhotoModalComponent} from "../custom/photo-modal/photo-modal.component";
import {CorpSelectComponent} from "../custom/corp-list-modal/corp-query.component";
import {CorpSelectModule} from "../custom/corp-list-modal/corp-query.module";
import {RecruitApply} from "./components/recruit/recruitApply.component";
import {RecruitApproved} from "./components/recruit/recruitApproved.component";
import {RecruitView} from "./components/recruit/recruitView.component";
import {PhotoListComponent} from "../custom/photo-list-modal/photo-list.component";


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
    CKEditorModule,
    NgxDatatableModule,
    NgxDatatableModule,
    CorpSelectModule,
    PhotoListModule,
    PhotoModalModule,
    EntityListModule,
    routing
  ],
  declarations: [
    LaRecruit,
    RecruitQuery,
    RecruitEdit,
    RecruitView,
    RecruitApply,
    RecruitApproved
  ],entryComponents:[PhotoModalComponent,CorpSelectComponent,EntityListComponent,PhotoListComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaRecruitModule {
}

