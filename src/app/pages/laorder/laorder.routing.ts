import { Routes, RouterModule }  from '@angular/router';


import {LaOrder} from "./laorder.component";
import {ConsumorderQuery} from "./components/consumorder/consumorder.component";
import {ConsumorderEdit} from "./components/consumorder/consumorderEdit.component";
import {ConsumorderView} from "./components/consumorder/consumorderView.component";
import {ChargeorderQuery} from "./components/chargeorder/chargeorder.compenent";



// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaOrder,
    children: [
      { path: 'consumorder', component: ConsumorderQuery },
      { path: 'consumorderView', component: ConsumorderView },
      { path: 'consumerorderedit', component: ConsumorderEdit },
      { path: 'chargeorder', component: ChargeorderQuery }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
