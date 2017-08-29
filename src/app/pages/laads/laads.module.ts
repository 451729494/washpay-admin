import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';

import { routing }       from './laads.routing';
import {LaAds} from "./laads.component";
import {AdsPosQuery} from "./components/adspos/adspos.component";
import {AdsPosEdit} from "./components/adspos/adsposEdit.component";
import {AdsLinkQuery} from "./components/adslink/adslink.component";
import {AdsLinkEdit} from "./components/adslink/adslinkEdit.component";
import {PhotoModalModule} from "../custom/photo-modal/photo-modal.module";
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";
import {PhotoModalComponent} from "../custom/photo-modal/photo-modal.component";
import {AppUserQuery} from "./components/appuser/appUser.component";
import {AppUserEdit} from "./components/appuser/appUserEdit.component";
import {AppUserView} from "./components/appuser/appUserView.component";
import {UserInfoModule} from "../custom/user-info-modal/userinfo-modal.module";
import {UserResumeModule} from "../custom/user-resume-modal/userresume-modal.module";
import {UserAccountDepositModule} from "../custom/user-deposit-list/userdeposit-list.module";
import {UserInfoComponent} from "../custom/user-info-modal/userinfo-modal.component";
import {UserResumeComponent} from "../custom/user-resume-modal/userresume-modal.component";
import {UserAccountDepositComponent} from "../custom/user-deposit-list/userdeposit-list.component";


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
    PhotoModalModule,
    EntityListModule,
    UserInfoModule,
    UserResumeModule,
    UserAccountDepositModule,
    routing
  ],
  declarations: [
    LaAds,
    AdsPosQuery,
    AdsPosEdit,
    AdsLinkQuery,
    AdsLinkEdit,
    AppUserQuery,
    AppUserEdit,
    AppUserView
  ],entryComponents:[PhotoModalComponent,EntityListComponent,UserInfoComponent,UserResumeComponent,UserAccountDepositComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaAdsModule {
}

