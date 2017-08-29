import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';
import { CKEditorModule } from 'ng2-ckeditor';

import { routing }       from './lamanage.routing';
import {LaManage} from "./lamanage.component";

import {PhotoListModule} from "../custom/photo-list-modal/photo-list.module";
import {PhotoModalModule} from "../custom/photo-modal/photo-modal.module";
import {LeaveApplyModule} from "../custom/leave-modal/leave-modal.module";
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";
import {PhotoModalComponent} from "../custom/photo-modal/photo-modal.component";
import {LeaveApplyComponent} from "../custom/leave-modal/leave-modal.component";
import {CorpManageQuery} from "./components/manage/corpManage.component";
import {CorpManageEdit} from "./components/manage/corpManageEdit.component";
import {ManageRoleQuery} from "./components/managerole/manageRole.component";
import {ManageRoleEdit} from "./components/managerole/manageRoleEdit.component";
import {ManageRoleModuleEdit} from "./components/managerole/manageRoleModule.component";


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
    PhotoListModule,
    PhotoModalModule,
    EntityListModule,
    routing
  ],
  declarations: [
    LaManage,
    CorpManageQuery,
    CorpManageEdit,
    ManageRoleQuery,
    ManageRoleEdit,
    ManageRoleModuleEdit
  ],entryComponents:[PhotoModalComponent,EntityListComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaManageModule {
}

