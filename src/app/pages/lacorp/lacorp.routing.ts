import { Routes, RouterModule }  from '@angular/router';


import {LaCorp} from "./lacorp.component";
import {CorpCustomerQuery} from "./components/corp/corp.component";

import {CorpCustomerView} from "./components/corp/corpView";
import {CorpEmployeeQuery} from "./components/employee/employee.component";
import {CorpEmployeeEdit} from "./components/employee/employeeEdit.component";
import {CorpEmployeeView} from "./components/employee/employeeView.component";
import {CorpEmployeeLeave} from "./components/leave/employeeleave.component";
import {CorpEmployeeLeaveEdit} from "./components/leave/employeeleaveEdit.component";
import {CorpEmployeeLeaveView} from "./components/leave/employeeleaveView.component";
import {CorpEmployeeApproved} from "./components/employee/employeeApproved.component";
import {CorpEmployeeLeaveApply} from "./components/leave/employeeleaveApply.component";
import {CorpEmployeeLeaveApproved} from "./components/leave/employeeleaveApproved.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaCorp,
    children: [
      { path: 'corpcustomer', component: CorpCustomerQuery },
      { path: 'corpcustomerview', component: CorpCustomerView },
      { path: 'employeequery', component: CorpEmployeeQuery },
      { path: 'employeeedit', component: CorpEmployeeEdit },
      { path: 'employeeview', component: CorpEmployeeView },
      { path: 'employeeleave', component: CorpEmployeeLeave },
      { path: 'employeeleaveedit', component: CorpEmployeeLeaveEdit },
      { path: 'employeeleaveview', component: CorpEmployeeLeaveView },
      { path: 'employeeapproved', component: CorpEmployeeApproved },
      { path: 'employeeleaveapply', component: CorpEmployeeLeaveApply },
      { path: 'employeeleaveapproved', component: CorpEmployeeLeaveApproved },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
