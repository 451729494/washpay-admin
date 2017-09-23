import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';

import { routing }       from './lapromotion.routing';
import {LaPromotion} from "./lapromotion.component";
import {DiscountcouponQuery} from "./components/discountcoupon/discountcoupon.component";
import {DiscountcouponAdd} from "./components/discountcoupon/discountcouponAdd.component";
import {DiscountcouponView} from "./components/discountcoupon/discountcouponView.component";



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
    LaPromotion,
    DiscountcouponAdd,
    DiscountcouponQuery,
    DiscountcouponAdd,
    DiscountcouponView
  ],entryComponents:[],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DiscountCouponModule {
}

