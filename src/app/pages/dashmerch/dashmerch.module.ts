import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { DashboardMerch } from './dashmerch.component';
import { routing }       from './dashmerch.routing';
import {PieChartMerch} from "./userPie/pieChartMerch.component";
import {ChartsModule} from "ng2-charts/index";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    ChartsModule,
    routing
  ],
  declarations: [
    DashboardMerch,
    PieChartMerch
  ]
})
export class DashboardMerchModule {}
