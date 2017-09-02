import { Routes, RouterModule }  from '@angular/router';


import {LaBranch} from "./labranch.component";
import {BranchQuery} from "./components/branch/branch.component";
import {BranchAdd} from "./components/branch/branchAdd.component";
import {BranchView} from "./components/branch/branchView.component";



// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaBranch,
    children: [
      { path: 'branch', component: BranchQuery },
      { path: 'branchAdd', component: BranchAdd },
      { path: 'branchView', component: BranchView }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
