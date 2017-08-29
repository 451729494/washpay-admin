import { Routes, RouterModule }  from '@angular/router';


import {LaCheck} from "./lacheck.component";
import {CheckTypeEdit} from "./components/checkType/checkTypeEdit.component";
import {CheckTypeQuery} from "./components/checkType/checkType.component";
import {CheckTypeRoleEdit} from "./components/checkType/checkTypeRole.component";
import {InvoiceApproveFlowHistory} from "./components/history/approveHistory.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaCheck,
    children: [
      { path: 'checktype', component: CheckTypeQuery},
      { path: 'checktypeedit', component: CheckTypeEdit },
      { path: 'checktyperoleedit', component: CheckTypeRoleEdit },
      { path: 'checkhistory', component: InvoiceApproveFlowHistory},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
