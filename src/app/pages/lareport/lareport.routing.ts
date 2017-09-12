import { Routes, RouterModule }  from '@angular/router';


import {LaReport} from "./lareport.component";
import {ChargeorderreportQuery} from "./component/chargeorder/chargeorderreport.component";
import {ChargeorderrepotView} from "./component/chargeorder/chargeorderreportView.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaReport,
    children: [
      { path: 'chargeorderreport', component: ChargeorderreportQuery },
      { path: 'chargeorderrepotview', component: ChargeorderrepotView }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
