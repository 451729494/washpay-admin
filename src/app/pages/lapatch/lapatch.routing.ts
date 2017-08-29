import { Routes, RouterModule }  from '@angular/router';


import {LaPatch} from "./lapatch.component";
import {PatchEmployeeQuery} from "./components/employee/employee.component";
import {PatchServiceQuery} from "./components/service/patchService.component";
import {PatchCustomerQuery} from "./components/customer/patchCustomer.component";
import {PatchEmployeeView} from "./components/employee/employeeView.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaPatch,
    children: [
      { path: 'patchcustomer', component: PatchCustomerQuery },
      { path: 'patchemployeequery', component: PatchEmployeeQuery },
      { path: 'patchservice', component: PatchServiceQuery },
      { path: 'patchemployeeview', component: PatchEmployeeView },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
