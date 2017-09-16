import { Routes, RouterModule }  from '@angular/router';

import {AuthorityQuery} from "./components/authority/authority.component";
import {AuthorityEdit} from "./components/authority/authorityEdit.component";
import {UserQuery} from "./components/user/user.component";
import {UserEdit} from "./components/user/userEdit.component";
import {LaCom} from "./lacom.component";
import {ModuleQuery} from "./components/module/moduleQuery.component";
import {ModuleEdit} from "./components/module/moduleEdit.component";
import {ModuleView} from "./components/module/moduleView.component";
import {ModuleOperatEdit} from "./components/module/moduleOperatEdit.component";
import {AuthModuleEdit} from "./components/authority/authModule.component";
import {SysThirdQuery} from "./components/third/thirdQuery.component";
import {SysThirdEdit} from "./components/third/thirdEdit.component";
import {SysThirdView} from "./components/third/thirdView.component";

import {CorpMerchEdit} from "./components/merch/corpMerchEdit.component";
import {CorpMerchQuery} from "./components/merch/corpMerch.component";
import {CorpMerchView} from "./components/merch/corpMerchView";
import {UserEvent} from "./components/event/userEvent.component";
import {ManageVersion} from "./components/version/manageVersion.component";
import {ManageVersionEdit} from "./components/version/manageVersionEdit.component";

import {BusiTypeQuery} from "./components/busi/busiType.component";
import {BusiTypeEdit} from "./components/busi/busiTypeEdit.component";

import {EmployeeQuery} from "./components/employee/employee.component";
import {EmployeeView} from "./components/employee/employeeView.component";
import {EmployeeEdit} from "./components/employee/employeeEdit.component";

import {ManagerQuery} from "./components/manager/manager.component";
import { ManagerEdit} from "./components/manager/managerEdit.component";
import {ManagerView}  from "./components/manager/managerView.component"

import {OrdinaryQuery} from "./components/ordinary/ordinary.component";
import {OrdinaryEdit} from "./components/ordinary/ordinaryEdit.component"
import {OrdinaryView} from "./components/ordinary/ordinaryView.component"

import {CommercialQuery} from "./components/commercial/commercial.component";
import {CommercialAdd} from "./components/commercial/commercialAdd.component";
import {CommercialView} from "./components/commercial/commercialView.component";

import {CustomQuery} from "./components/commonuser/commonuser.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaCom,
    children: [
      { path: 'authority', component: AuthorityQuery },
      { path: 'authorityedit', component: AuthorityEdit },
      { path: 'user', component: UserQuery },
      { path: 'useredit', component: UserEdit },
      { path: 'module', component: ModuleQuery },
      { path: 'moduleedit', component: ModuleEdit },
      { path: 'moduleview', component: ModuleView },
      { path: 'operatedit', component: ModuleOperatEdit },
      { path: 'authmodule', component: AuthModuleEdit },
      { path: 'third', component: SysThirdQuery },
      { path: 'thirdedit', component: SysThirdEdit },
      { path: 'thirdview', component: SysThirdView },
      { path: 'corpmerch', component: CorpMerchQuery },
      { path: 'corpmerchedit', component: CorpMerchEdit },
      { path: 'corpmerchview', component: CorpMerchView },
      { path: 'userevent', component: UserEvent },
      { path: 'manageversion', component: ManageVersion },
      { path: 'manageversionedit', component: ManageVersionEdit },
      { path: 'busitype', component: BusiTypeQuery },
      { path: 'busitypeedit', component: BusiTypeEdit },
      { path: 'employee', component: EmployeeQuery },
      { path: 'employeeview', component: EmployeeView },
      { path: 'employeeedit', component: EmployeeEdit },
      { path: 'manager', component: ManagerQuery },
      { path: 'manageredit', component: ManagerEdit },
      { path: 'managerview', component: ManagerView },
      { path: 'ordinary', component: OrdinaryQuery },
      { path: 'ordinaryedit', component: OrdinaryEdit },
      { path: 'ordinaryview', component: OrdinaryView },
      { path: 'commercial', component: CommercialQuery },
      { path: 'commercialAdd', component: CommercialAdd },
      { path: 'commercialView', component: CommercialView },
      { path: 'commonuser', component: CustomQuery }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
