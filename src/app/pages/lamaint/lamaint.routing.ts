import { Routes, RouterModule }  from '@angular/router';


import {LaMaint} from "./lamaint.component";

import {SysMaintQuery} from "./components/maint/maint.component";
import {SysMaintView} from "./components/maint/maintView.component";
import {SysMaintCustServiceQuery} from "./components/maint/maintcustservice.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaMaint,
    children: [
      { path: 'sysmaint', component: SysMaintQuery },
      { path: 'sysmaintview', component: SysMaintView },
      { path: 'sysmaintcustservice', component: SysMaintCustServiceQuery },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
