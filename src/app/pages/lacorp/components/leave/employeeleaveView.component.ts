/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { PageDataModel } from '../../../../services/models/page.model';
import { UserPhotoService } from '../../../../services/user/userPhoto.service';
import { Keys,Utils} from '../../../../services/models/env';

import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AuthService} from "../../../../services/auth.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {CorpExpeseInvoiceService} from "../../../../services/finance/corpExpeseInvoice.service";
import {UserAccountBorrowService} from "../../../../services/finance/userAccountBorrow.service";
import {CorpEmployeeLeaveService} from "../../../../services/corp/corpEmployeeLeave.service";
import {UserCorpSalaryService} from "../../../../services/finance/userCorpSalary.service";
import {EmployeeCorpSalaryItemComponent} from "../../../custom/employee-salary-item/employee-salary-item.component";

@Component({
  selector: 'la-employee-leave-view',
  templateUrl:'./employeeleaveView.html'
})
export class CorpEmployeeLeaveView {

  public rows:Array<any> [];

  public pageNav = new PageDataModel();

  public curId:string = '';

  public employee:any;
  public backAction = 'query';

  public corpEmployeeLeave:any;

  bCalcSalary =false;
  bCalcWorkTime=false;
  bPay=false;

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private corpEmployeeLeaveService:CorpEmployeeLeaveService, private authService:AuthService,  private modalService: NgbModal,private userCorpSalaryService:UserCorpSalaryService) {

    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    //返回对应的页面
    this.backAction = this.route.snapshot.queryParams["backAction"];

  }

  public ngOnInit():void {


   this.loadData();

  }

  public loadData(){
    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.corpEmployeeLeaveService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {

            this.employee = res.data.employee;
            this.corpEmployeeLeave = res.data;

            this.loadDataSalary();
          }
        } else {
          console.log(res.message);
        }
      });

    }
  }


  public loadDataSalary(){
    let requestParam = new URLSearchParams();
    requestParam.set('month', this.corpEmployeeLeave.month);
    requestParam.set('corpEmployee.code', this.corpEmployeeLeave.employee.code);
    requestParam.set('dispatchedCorpId', this.corpEmployeeLeave.dispatchedCorpId);
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.userCorpSalaryService.pageQuery(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
  }


  public toCalcSalary(){
    this.bCalcSalary = true;

    let requestParam = new URLSearchParams();
    requestParam.set('id', this.corpEmployeeLeave.id);
    this.corpEmployeeLeaveService.toCalcSalary(requestParam)
      .subscribe(res => {

        if (res.successed === '00') {

          this.bCalcSalary = false;

        } else {
          console.log(res.message);
        }
      });
  }

  public toCalcWorkTime(){

    this.bCalcWorkTime = true;

    let requestParam = new URLSearchParams();
    requestParam.set('id', this.corpEmployeeLeave.id);
    this.corpEmployeeLeaveService.toCalcWorkTime(requestParam)
      .subscribe(res => {

        if (res.successed === '00') {
          this.bCalcWorkTime = false;
        } else {
          console.log(res.message);
        }
      });
  }


  toPay(){

    this.bPay = true;

    let requestParam = new URLSearchParams();
    requestParam.set('id', this.curId);

    this.corpEmployeeLeaveService.toPay(requestParam)
      .subscribe(res => {
        this.bPay = false;
        if (res.successed === '00') {
          this.loadData();
           alert("支付成功");
        } else {
          alert(res.message);
        }
      });

  }

  public toBack() {

    if(this.backAction === 'query'){
      this.router.navigate(['/pages/lacorp/employeeleave']);
    }else if(this.backAction === 'apply'){
      this.router.navigate(['/pages/lacorp/employeeleaveapply']);
    }else if(this.backAction === 'approved'){
      this.router.navigate(['/pages/lacorp/employeeleaveapproved']);
    }


  }


  public toViewItem(curId){


    const customerModal = this.modalService.open(EmployeeCorpSalaryItemComponent, {size: 'lg'});
    customerModal.componentInstance.modalHeader = '工资明细';
    customerModal.componentInstance.salaryMonthId = curId;

    customerModal.result.then((result) => {

      console.log('result' +result);

    });

  }

  setPage(event){

  }
}
