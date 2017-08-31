import { Routes, RouterModule }  from '@angular/router';


import {LaOrder} from "./laorder.component";
import {ConsumorderQuery} from "./components/consumorder/consumorder.component";
import {ConsumorderEdit} from "./components/consumorder/consumorderEdit.component";



// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaOrder,
    children: [
      { path: 'consumorder', component: ConsumorderQuery },
      { path: 'consumerorderedit', component: ConsumorderEdit }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
