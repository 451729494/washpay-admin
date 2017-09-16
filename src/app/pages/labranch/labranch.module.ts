import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';

import { routing }       from './labranch.routing';
import {LaBranch} from "./labranch.component";
import {BranchQuery} from "./components/branch/branch.component";
import {BranchAdd} from "./components/branch/branchAdd.component";
import {BranchView} from "./components/branch/branchView.component";
import {BranchBind} from "./components/branchrelatord/branchrelatord.component";
import {OrdinaryList} from "./components/branchrelatord/ordinaryList.component";
import {BranchBindCom} from "./components/branchrelatcom/branchrelatcom.component";
import {BindedCommercial} from "./components/branchrelatcom/bindedcommercial.component";
import {UnBindedCommercial} from "./components/branchrelatcom/unbindedcommercial.component";
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";
import {MyBranch} from "./components/mybranch/mybranch.component";
import {CommBranch} from "./components/commbranch/commbranch.component";
import {DevicerelatQuery} from "./components/devicerelat/devicerelat.component";
import {DevicerelatEdit} from "./components/devicerelat/devicerelatEdit.component";
import {DevicerelatBranchList} from "./components/devicerelat/devicerelatBranchList.component";


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
    LaBranch,
    BranchAdd,
    BranchQuery,
    BranchAdd,
    BranchView,
    BranchBind,
    OrdinaryList,
    BranchBindCom,
    BindedCommercial,
    UnBindedCommercial,
    MyBranch,
    CommBranch,
    DevicerelatQuery,
    DevicerelatEdit,
    DevicerelatBranchList

  ],entryComponents:[EntityListComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BranchModule {
}

