import { NgModule,CUSTOM_ELEMENTS_SCHEMA}      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing }       from './lacom.routing';
import {LaCom} from "./lacom.component";
import {AuthorityQuery} from "./components/authority/authority.component";
import {UserQuery} from "./components/user/user.component";
import {AuthorityEdit} from "./components/authority/authorityEdit.component";
import {UserEdit} from "./components/user/userEdit.component";
import {ModuleService} from "../../services/check/module.service";
import {ModuleQuery} from "./components/module/moduleQuery.component";
import {ModuleEdit} from "./components/module/moduleEdit.component";
import {ModuleView} from "./components/module/moduleView.component";
import {ModuleOperatEdit} from "./components/module/moduleOperatEdit.component";
import {AuthModuleEdit} from "./components/authority/authModule.component";
import {SysThirdQuery} from "./components/third/thirdQuery.component";
import {SysThirdEdit} from "./components/third/thirdEdit.component";
import {SysThirdView} from "./components/third/thirdView.component";
import {PhotoModalComponent} from "../custom/photo-modal/photo-modal.component";
import {PhotoModalModule} from "../custom/photo-modal/photo-modal.module";

import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgUploaderModule } from 'ngx-uploader';
import { CKEditorModule } from 'ng2-ckeditor';

import {SysThirdListComponent} from "./components/third/thirdList.component";
import {SysThirdListModule} from "./components/third/thirdList.module";

import {CorpManageListComponent} from "./components/user/corpManageList.component";
import {CorpManageListModule} from "./components/user/corpManageList.module";
import {CorpMerchEdit} from "./components/merch/corpMerchEdit.component";
import {CorpMerchQuery} from "./components/merch/corpMerch.component";
import {CorpMerchView} from "./components/merch/corpMerchView";
import {ManageVersion} from "./components/version/manageVersion.component";
import {ManageVersionEdit} from "./components/version/manageVersionEdit.component";
import {UserEvent} from "./components/event/userEvent.component";

import {BusiTypeQuery} from "./components/busi/busiType.component";
import {BusiTypeEdit} from "./components/busi/busiTypeEdit.component";

import {EmployeeQuery} from "./components/employee/employee.component";
import {EmployeeView} from "./components/employee/employeeView.component";
import {EmployeeEdit} from "./components/employee/employeeEdit.component";

import {ManagerQuery} from "./components/manager/manager.component";
import {ManagerEdit} from "./components/manager/managerEdit.component";
import {ManagerView} from "./components/manager/managerView.component"

import {OrdinaryQuery} from "./components/ordinary/ordinary.component"
import {OrdinaryEdit} from "./components/ordinary/ordinaryEdit.component";
import {OrdinaryView} from "./components/ordinary/ordinaryView.component";

import {CommercialQuery} from "./components/commercial/commercial.component";
import {CommercialAdd} from "./components/commercial/commercialAdd.component";
import {CommercialView} from "./components/commercial/commercialView.component";

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
    PhotoModalModule,
    NgxDatatableModule,
    SysThirdListModule,
    CorpManageListModule,
    routing
  ],
  declarations: [
    LaCom,
    AuthorityQuery,
    AuthorityEdit,
    AuthModuleEdit,
    UserQuery,
    UserEdit,
    ModuleQuery,
    ModuleEdit,
    ModuleView,
    ModuleOperatEdit,
    SysThirdQuery,
    SysThirdEdit,
    SysThirdView,
    CorpMerchEdit,
    CorpMerchQuery,
    CorpMerchView,
    UserEvent,
    ManageVersion,
    ManageVersionEdit,
    BusiTypeQuery,
    BusiTypeEdit,
    EmployeeQuery,
    EmployeeView,
    EmployeeEdit,
    ManagerQuery,
    ManagerEdit,
    ManagerView,
    OrdinaryQuery,
    OrdinaryEdit,
    OrdinaryView,
    CommercialAdd,
    CommercialQuery,
    CommercialAdd,
    CommercialView
  ],entryComponents:[PhotoModalComponent,CorpManageListComponent,SysThirdListComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaComModule {
}

