import { Routes, RouterModule }  from '@angular/router';


import {LaManage} from "./lamanage.component";
import {CorpManageQuery} from "./components/manage/corpManage.component";
import {CorpManageEdit} from "./components/manage/corpManageEdit.component";
import {ManageRoleQuery} from "./components/managerole/manageRole.component";
import {ManageRoleEdit} from "./components/managerole/manageRoleEdit.component";
import {ManageRoleModuleEdit} from "./components/managerole/manageRoleModule.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaManage,
    children: [
      { path: 'corpmanage', component: CorpManageQuery },
      { path: 'corpmanageedit', component: CorpManageEdit },
      { path: 'managerole', component: ManageRoleQuery },
      { path: 'manageroleedit', component: ManageRoleEdit },
      { path: 'managerolemodule', component: ManageRoleModuleEdit },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
