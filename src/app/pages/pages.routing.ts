import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {CanActivateGuard} from "../services/guard.service";
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'changepassword',
    loadChildren: 'app/pages/resetchange/change.module#ChangeModule'
  },
  {
    path: 'reset',
    loadChildren: 'app/pages/reset/reset.module#ResetModule'
  },
  {
    path: 'pages',
    component: Pages,
    canActivate:[CanActivateGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'dashmerch', loadChildren: './dashmerch/dashmerch.module#DashboardMerchModule' },
      { path: 'lacom', loadChildren: './lacom/lacom.module#LaComModule' },
      { path: 'lablog', loadChildren: './lablog/lablog.module#LaBlogModule' },
      { path: 'larecruit', loadChildren: './larecruit/larecruit.module#LaRecruitModule' },
      { path: 'laads', loadChildren: './laads/laads.module#LaAdsModule' },
      { path: 'editors', loadChildren: './editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: './maps/maps.module#MapsModule' },
      { path: 'lacorp', loadChildren: './lacorp/lacorp.module#LaCorpModule' },
      { path: 'lacheck', loadChildren: './lacheck/lacheck.module#LaCheckModule' },
      { path: 'lafinance', loadChildren: './lafinance/lafinance.module#LaFinanceModule' },
      { path: 'lamsg', loadChildren: './lamsg/lamsg.module#LaMsgModule' },
      { path: 'dashadmin', loadChildren: './dashadmin/dashadmin.module#DashboardAdminModule' },
      { path: 'dashpatch', loadChildren: './dashpatch/dashpatch.module#DashboardPatchModule' },
      { path: 'lapatch', loadChildren: './lapatch/lapatch.module#LaPatchModule' },
      { path: 'lamanage', loadChildren: './lamanage/lamanage.module#LaManageModule' },
      { path: 'lamaint', loadChildren: './lamaint/lamaint.module#LaMaintModule' },
      { path: 'laorder', loadChildren: './laorder/laorder.module#LaOrderModule' },
      { path: 'lapromotion', loadChildren: './lapromotion/lapromotion.module#DiscountCouponModule' },
      { path: 'labranch', loadChildren: './labranch/labranch.module#BranchModule' },
      { path: 'lacom', loadChildren: './lacom/lacom.module#LaComModule' },
      { path: 'lasplit', loadChildren: './lasplit/lasplit.module#SplitModule' }

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
