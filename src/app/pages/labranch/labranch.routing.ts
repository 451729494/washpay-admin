import { Routes, RouterModule }  from '@angular/router';


import {LaBranch} from "./labranch.component";
import {BranchQuery} from "./components/branch/branch.component";
import {BranchAdd} from "./components/branch/branchAdd.component";
import {BranchView} from "./components/branch/branchView.component";
import {BranchBind} from "./components/branchrelatord/branchrelatord.component";
import {OrdinaryList} from "./components/branchrelatord/ordinaryList.component";
import {BranchBindCom} from "./components/branchrelatcom/branchrelatcom.component";
import {BindedCommercial} from "./components/branchrelatcom/bindedcommercial.component";
import {UnBindedCommercial} from "./components/branchrelatcom/unbindedcommercial.component";
import {MyBranch} from "./components/mybranch/mybranch.component";
import {CommBranch} from "./components/commbranch/commbranch.component";
import {DevicerelatQuery} from "./components/devicerelat/devicerelat.component";
import {DevicerelatEdit} from "./components/devicerelat/devicerelatEdit.component";
import {DevicerelatBranchList} from "./components/devicerelat/devicerelatBranchList.component";
import {DeviceQuery} from "./components/device/device.component";


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
      { path: 'unbindedcommercial', component: UnBindedCommercial },
      { path: 'mybranch', component: MyBranch },
      { path: 'commbranch', component: CommBranch },
      { path: 'devicerelat', component: DevicerelatQuery },
      { path: 'devicerelatedit', component: DevicerelatEdit },
      { path: 'devicerelatbranchlist', component: DevicerelatBranchList },
      { path: 'device', component: DeviceQuery }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
