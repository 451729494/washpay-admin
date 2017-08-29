import { Routes, RouterModule }  from '@angular/router';

import { ChangePassword } from './changePassword.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ChangePassword
  }
];

export const routing = RouterModule.forChild(routes);
