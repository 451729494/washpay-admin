import { Routes, RouterModule }  from '@angular/router';


import {LaAds} from "./laads.component";
import {AdsPosQuery} from "./components/adspos/adspos.component";
import {AdsPosEdit} from "./components/adspos/adsposEdit.component";
import {AdsLinkQuery} from "./components/adslink/adslink.component";
import {AdsLinkEdit} from "./components/adslink/adslinkEdit.component";
import {AppUserQuery} from "./components/appuser/appUser.component";
import {AppUserEdit} from "./components/appuser/appUserEdit.component";
import {AppUserView} from "./components/appuser/appUserView.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaAds,
    children: [
      { path: 'adspos', component: AdsPosQuery },
      { path: 'adsposedit', component: AdsPosEdit },
      { path: 'adslink', component: AdsLinkQuery },
      { path: 'adslinkedit', component: AdsLinkEdit },
      { path: 'appuser', component: AppUserQuery },
      { path: 'appuseredit', component: AppUserEdit},
      { path: 'appuserview', component: AppUserView},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
