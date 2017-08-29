import { Routes, RouterModule }  from '@angular/router';


import {LaRecruit} from "./larecruit.component";
import {RecruitQuery} from "./components/recruit/recruit.component";
import {RecruitEdit} from "./components/recruit/recruitEdit.component";
import {RecruitApply} from "./components/recruit/recruitApply.component";
import {RecruitApproved} from "./components/recruit/recruitApproved.component";
import {RecruitView} from "./components/recruit/recruitView.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaRecruit,
    children: [

      { path: 'recruit', component: RecruitQuery },
      { path: 'recruitedit', component: RecruitEdit },
      { path: 'recruitapply', component: RecruitApply },
      { path: 'recruitview', component: RecruitView },
      { path: 'recruitapproved', component: RecruitApproved }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
