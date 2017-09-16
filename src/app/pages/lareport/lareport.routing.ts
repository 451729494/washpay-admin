import { Routes, RouterModule }  from '@angular/router';


import {LaReport} from "./lareport.component";
import {ChargeorderreportQuery} from "./component/chargeorder/chargeorderreport.component";
import {ChargeorderrepotView} from "./component/chargeorder/chargeorderreportView.component";
import {OrderreportQuery} from "./component/orderreport/orderreport.component";
import {OrderreportView} from "./component/orderreport/orderreportView.component";
import {SplitbillreportQuery} from "./component/splitbillreport/splitbillreport.component";
import {SplitbillreportView} from "./component/splitbillreport/splitbillreportView.component";
import {WithdrawreportQuery} from "./component/withdrawreport/withdrawreport.component";
import {WithdrawreportView} from "./component/withdrawreport/withdrawreportView.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaReport,
    children: [
      { path: 'chargeorderreport', component: ChargeorderreportQuery },
      { path: 'chargeorderrepotview', component: ChargeorderrepotView },
      { path: 'orderreport', component: OrderreportQuery },
      { path: 'orderreportview', component: OrderreportView },
      { path: 'splitbillreport', component: SplitbillreportQuery },
      { path: 'splitbillreportview', component: SplitbillreportView },
      { path: 'withdrawreport', component: WithdrawreportQuery },
      { path: 'withdrawreportview', component: WithdrawreportView }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
