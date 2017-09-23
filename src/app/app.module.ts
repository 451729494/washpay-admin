import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import {AuthService} from "./services/auth.service";
import {AuthorityService} from "./services/check/authority.service";
import {ModuleService} from "./services/check/module.service";
import {CanActivateGuard} from "./services/guard.service";
import {UserService} from "./services/user.service";
import {UserPhotoService} from "./services/user/userPhoto.service";
import {CorpService} from "./services/corp/corp.service";
import {AuthModuleService} from "./services/check/authModule.service";
import {CorpEmployeeService} from "./services/corp/corpEmployee.service";
import {CorpCustomerService} from "./services/corp/corpCustomer.service";
import {CorpManageRoleService} from "./services/corp/corpManageRole.service";
import {SysThirdService} from "./services/third/third.service";
import {CorpEmployeeLeaveService} from "./services/corp/corpEmployeeLeave.service";
import {ManageVersionService} from "./services/third/manageVersion.service";
import {DataAnalysisService} from "./services/dataAnalysis.service";
import {CorpManageService} from "./services/corp/corpManage.service";
import {CorpManageModuleService} from "./services/corp/corpManageModule.service";
import {UserInfoService} from "./services/user/userInfo.service";
import {UserResumeService} from "./services/user/userResume.service";
import {UserResumeTrackService} from "./services/user/userResumeTrack.service";
import {ConsumorderService} from "./services/consumorder/consumorder.service";
import {ChargeorderService} from "./services/chargeoder/chargeorder.service";
import {DiscountcouponService} from "./services/discountcoupon/discountcoupon.service";
import {BranchService} from "./services/branch/branch.service";
import {EmployeeService} from "./services/corp/employee.service";
import {ManagerService} from "./services/corp/manager.service";
import {CommercialService} from "./services/commercial/commercial.service";
import {OrdinaryService} from "./services/ordinary/ordinary.service";
import {DevicerelatService} from "./services/branch/devicerelat.service";
import {SplitbillService} from "./services/splitbill/splitbill.service";
import {ChargeorderrepotService} from "./services/report/chargeorderrepot.service";
import {OrderreportService} from "./services/report/orderreport.service";
import {SplitbillreportService} from "./services/report/splitbillreport.service";
import {SplitBranchQuery} from "./pages/lasplit/components/splitbranch.component";
import {DeviceService} from "./services/device/device.service";
import {WithdrawService} from "./services/report/withdraw.service";
import {WithdrawreportService} from "./services/report/withdrawreport.service";
// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  AuthService,
  ModuleService,
  CanActivateGuard,
  UserService,
  AuthorityService,
  UserPhotoService,
  CorpService,
  AuthModuleService,
  CorpManageRoleService,
  CorpEmployeeService,
  CorpEmployeeLeaveService,
  CorpCustomerService,
  SysThirdService,
  ManageVersionService,
  DataAnalysisService,
  CorpManageService,
  CorpManageModuleService,
  UserInfoService,
  UserResumeService,
  UserResumeTrackService,
  ConsumorderService,
  ChargeorderService,
  DiscountcouponService,
  BranchService,
  EmployeeService,
  ManagerService,
  CommercialService,
  OrdinaryService,
  DevicerelatService,
  SplitbillService,
  ChargeorderrepotService,
  SplitBranchQuery,
  OrderreportService,
  SplitbillreportService,
  DeviceService,
  WithdrawService,
  WithdrawreportService
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS
  ]
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
