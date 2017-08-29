import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { DashboardPatch } from './dashpatch.component';
import { routing }       from './dashpatch.routing';
import {PieChartPatch} from "./userPie/pieChartPatch.component";
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
    DashboardPatch,
    PieChartPatch
  ]
})
export class DashboardPatchModule {}
