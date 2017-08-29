import { Routes, RouterModule }  from '@angular/router';


import {LaMsg} from "./lamsg.component";
import {MsgTemplateQuery} from "./components/template/msgTemplate.component";
import {MsgTemplateEdit} from "./components/template/msgTemplateEdit";
import {MsgPushQuery} from "./components/push/msgPush.component";
import {MsgPushEdit} from "./components/push/msgPushEdit.component";
import {MsgPushView} from "./components/push/msgPushView";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaMsg,
    children: [
      { path: 'msgtemplate', component: MsgTemplateQuery },
      { path: 'msgtemplateedit', component: MsgTemplateEdit },
      { path: 'msgpush', component: MsgPushQuery },
      { path: 'msgpushedit', component: MsgPushEdit },
      { path: 'msgpushview', component: MsgPushView }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
