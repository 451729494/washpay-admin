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
import {CanActivateGuard} from "./services/guard.service";
import {UserService} from "./services/user.service";
import {CategoryService} from "./services/blog/category.service";
import {BlogService} from "./services/blog/blog.service";
import {UserPhotoService} from "./services/user/userPhoto.service";
import {RecruitService} from "./services/recruit/recruit.service";
import {BusiTypeService} from "./services/recruit/busiType.service";
import {CorpService} from "./services/corp/corp.service";
import {AdsPosService} from "./services/ads/adsPos.service";
import {AdsLinkService} from "./services/ads/adsLink.service";
import {ModuleService} from "./services/check/module.service";
import {ModuleOperatService} from "./services/check/moduleOperat.service";
import {AuthModuleService} from "./services/check/authModule.service";
import {AccountConstService} from "./services/finance/accountConst.service";
import {AccountPositionService} from "./services/finance/accountPosition.service";
import {AccountConstItemService} from "./services/finance/accountConstItem.service";
import {AccountItemService} from "./services/finance/accountItem.service";
import {AccountPositionItemService} from "./services/finance/accountPositionItem.service";
import {CorpEmployeeService} from "./services/corp/corpEmployee.service";
import {CorpCustomerService} from "./services/corp/corpCustomer.service";
import {CorpManageRoleService} from "./services/corp/corpManageRole.service";
import {CheckTypeService} from "./services/check/checkType.service";
import {CheckTypeFlowService} from "./services/check/checkTypeFlow.service";
import {SysThirdService} from "./services/third/third.service";
import {CorpExpeseInvoiceService} from "./services/finance/corpExpeseInvoice.service";
import {CorpExpeseMonthItemService} from "./services/finance/corpExpeseMonthItem.service";
import {UserAccountBorrowService} from "./services/finance/userAccountBorrow.service";
import {UserAccountDepositService} from "./services/finance/userAccountDeposit.service";
import {MsgTemplateService} from "./services/msg/msgTemplate.service";
import {MsgPushService} from "./services/msg/msgPush.service";
import {RecruitApplyService} from "./services/recruit/recruitApply.service";
import {CorpEmployeeLeaveService} from "./services/corp/corpEmployeeLeave.service";
import {CorpSalaryInvoiceService} from "./services/finance/corpSalaryInvoice.service";
import {UserCorpSalaryService} from "./services/finance/userCorpSalary.service";
import {UserCorpSalaryItemService} from "./services/finance/userCorpSalaryItem.service";
import {UserEventService} from "./services/check/userEvent.service";
import {ManageVersionService} from "./services/third/manageVersion.service";
import {CheckInvoiceFlowService} from "./services/check/checkInvoiceFlow.service";
import {UserWorkDayService} from "./services/finance/userWorkDay.service";
import {SysMaintService} from "./services/corp/sysMaint.service";
import {SysMaintCommentService} from "./services/corp/sysMaintComment.service";
import {DataAnalysisService} from "./services/dataAnalysis.service";
import {CorpManageService} from "./services/corp/corpManage.service";
import {CorpManageModuleService} from "./services/corp/corpManageModule.service";
import {ManageCostInvoiceService} from "./services/finance/manageCostInvoice.service";
import {ManageCostMonthItemService} from "./services/finance/manageCostMonthItem.service";
import {UserInfoService} from "./services/user/userInfo.service";
import {UserAccountService} from "./services/finance/userAccount.service";
import {UserResumeService} from "./services/user/userResume.service";
import {UserResumeTrackService} from "./services/user/userResumeTrack.service";
import {UserMealRecordService} from "./services/finance/userMealRecord.service";
import {UserWorkMonthService} from "./services/finance/userWorkMonth.service";
import {UserAccountRecordService} from "./services/finance/userAccountRecord.service";
import {ConsumorderService} from "./services/consumorder/consumorder.service"

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  AuthService,
  CanActivateGuard,
  UserService,
  AuthorityService,
  CategoryService,
  BlogService,
  UserPhotoService,
  RecruitService,
  BusiTypeService,
  CorpService,
  AdsPosService,
  AdsLinkService,
  ModuleService,
  ModuleOperatService,
  AuthModuleService,
  CorpManageRoleService,
  AccountConstService,
  AccountPositionService,
  AccountConstItemService,
  AccountItemService,
  AccountPositionItemService,
  CorpEmployeeService,
  CorpEmployeeLeaveService,
  CorpCustomerService,
  CheckTypeService,
  CheckTypeFlowService,
  SysThirdService,
  CorpExpeseInvoiceService,
  CorpExpeseMonthItemService,
  CorpSalaryInvoiceService,
  UserAccountBorrowService,
  UserAccountDepositService,
  UserCorpSalaryService,
  UserCorpSalaryItemService,
  MsgTemplateService,
  MsgPushService,
  RecruitApplyService,
  UserEventService,
  ManageVersionService,
  CheckInvoiceFlowService,
  UserWorkDayService,
  SysMaintService,
  SysMaintCommentService,
  DataAnalysisService,
  CorpManageService,
  CorpManageModuleService,
  ManageCostInvoiceService,
  ManageCostMonthItemService,
  UserInfoService,
  UserAccountService,
  UserResumeService,
  UserResumeTrackService,
  UserMealRecordService,
  UserWorkMonthService,
  UserAccountRecordService,
  ConsumorderService
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
