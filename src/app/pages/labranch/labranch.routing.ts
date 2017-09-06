import { Routes, RouterModule }  from '@angular/router';


import {LaBranch} from "./labranch.component";
import {BranchQuery} from "./components/branch/branch.component";
import {BranchAdd} from "./components/branch/branchAdd.component";
import {BranchView} from "./components/branch/branchView.component";
import {BranchBind} from "./components/branchrelatord/branchrelatord.component";
import {OrdinaryList} from "./components/branchrelatord/ordinaryList.component";
import {BranchBindCom} from "./components/branchrelatcom/branchrelatcom.component";
import {BindedCommercial} from "./components/branchrelatcom/bindedcommercial.component";
import {MyBranch} from "./components/mybranch/mybranch.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaBranch,
    children: [
      { path: 'branch', component: BranchQuery },
      { path: 'branchAdd', component: BranchAdd },
      { path: 'branchView', component: BranchView },
      { path: 'branchrelatord', component: BranchBind },
      { path: 'ordinarylist', component: OrdinaryList },
      { path: 'branchrelatcom', component: BranchBindCom },
      { path: 'bindedcommercial', component: BindedCommercial },
      { path: 'mybranch', component: MyBranch }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
