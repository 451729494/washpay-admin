import { Routes, RouterModule }  from '@angular/router';





import {Lasplit} from "./lasplit.component";
import {SplitQuery} from "./components/split.component";
import {SplitManagerQuery} from "./components/splitManager.component";
import {SplitCommercialQuery} from "./components/splitComm.component";
import {SplitBranchQuery} from "./components/splitbranch.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Lasplit,
    children: [
      { path: 'split', component: SplitBranchQuery },
      { path: 'splitmanage', component: SplitManagerQuery },
      { path: 'splitcomm', component: SplitCommercialQuery },
      { path: 'splitbranch', component: SplitQuery }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
