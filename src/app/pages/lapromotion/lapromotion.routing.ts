import { Routes, RouterModule }  from '@angular/router';


import {LaPromotion} from "./lapromotion.component";
import {DiscountcouponQuery} from "./components/discountcoupon/discountcoupon.component";
import {DiscountcouponAdd} from "./components/discountcoupon/discountcouponAdd.component";
import {DiscountcouponView} from "./components/discountcoupon/discountcouponView.component";



// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaPromotion,
    children: [
      { path: 'discountcoupon', component: DiscountcouponQuery },
      { path: 'discountcouponAdd', component: DiscountcouponAdd },
      { path: 'discountcouponView', component: DiscountcouponView }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
