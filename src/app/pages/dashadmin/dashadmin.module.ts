import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { DashboardAdmin } from './dashadmin.component';
import { routing }       from './dashadmin.routing';
import {PieChartUser} from "./userPie/pieChartUser.component";
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
    DashboardAdmin,
    PieChartUser
  ]
})
export class DashboardAdminModule {}
