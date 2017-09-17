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
import {OrdinaryOrderreportQuery} from "./component/ordinaryorderreport/ordinaryorderreport.component";
import {CommOrderreportQuery} from "./component/commorderreport/commorderreport.component";
import {CommsplitQuery} from "./component/commsplitbill/commsplit.component";
import {CommsplitDetail} from "./component/commsplitbill/commsplitDetail.component";
import {OrdinarysplitbillreportQuery} from "./component/ordinarysplitbill/ordinarysplitbillreport.component";
import {OrdinarysplitbillreportView} from "./component/ordinarysplitbill/ordinarysplitbillreportView.component";

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
      { path: 'withdrawreportview', component: WithdrawreportView },
      { path: 'ordinaryorderreport', component: OrdinaryOrderreportQuery },
      { path: 'commorderreport', component: CommOrderreportQuery },
      { path: 'commsplit', component: CommsplitQuery },
      { path: 'commsplitdetail', component: CommsplitDetail },
      { path: 'ordinarysplitbillreport', component: OrdinarysplitbillreportQuery },
      { path: 'ordinarysplitbillreportview', component: OrdinarysplitbillreportView }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
