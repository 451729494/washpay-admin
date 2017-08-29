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
      { path: 'busitypeedit', component: BusiTypeEdit }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
