/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { PageDataModel } from '../../../../services/models/page.model';
import { UserPhotoService } from '../../../../services/user/userPhoto.service';
import { Keys,Utils} from '../../../../services/models/env';
import {AccountPositionService} from "../../../../services/finance/accountPosition.service";

import {AuthService} from "../../../../services/auth.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {CorpSalaryInvoiceService} from "../../../../services/finance/corpSalaryInvoice.service";
import {UserCorpSalaryService} from "../../../../services/finance/userCorpSalary.service";
import {EmployeeCorpSalaryItemComponent} from "../../../custom/employee-salary-item/employee-salary-item.component";

@Component({
  selector: 'la-salary-invoice-view',
  templateUrl:'./salaryinvoiceView.html'
})
export class CorpSalaryInvoiceView {

  public rows:Array<any> [];

  public pageNav = new PageDataModel();

  public curId:string = '';

  backAction = 'query';


  public salaryInvoice:any;

  public bCalcWorkTime = false;
  public bCalcSalary = false;
  public bPay = false;

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private userCorpSalaryService:UserCorpSalaryService, private corpSalaryInvoiceService:CorpSalaryInvoiceService, private modalService: NgbModal, private authService:AuthService) {



    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];
    this.backAction = this.route.snapshot.queryParams["backAction"];
  }

  public ngOnInit():void {


    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.corpSalaryInvoiceService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.salaryInvoice = res.data;

            this.loadData();

          }
        } else {
          console.log(res.message);
        }
      });



    }

  }

  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('month', this.salaryInvoice.month);
    requestParam.set('corpEmployee.corpId', this.salaryInvoice.custCorp.id);
    requestParam.set('dispatchedCorpId', this.salaryInvoice.dispatchedCorpId);
    requestParam.set('employeeStatus', '1');
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



  public toViewItem(curItemId){


    const customerModal = this.modalService.open(EmployeeCorpSalaryItemComponent, {size: 'lg'});
    customerModal.componentInstance.modalHeader = '工资明细';
    customerModal.componentInstance.salaryMonthId = curItemId;

    customerModal.result.then((result) => {

      console.log('result' +result);

    });


  }

  public toCalcSalary(){
    this.bCalcSalary = true;

    let requestParam = new URLSearchParams();
    requestParam.set('id', this.salaryInvoice.id);
    this.corpSalaryInvoiceService.toCalcSalary(requestParam)
      .subscribe(res => {
        this.bCalcSalary = false;

        if (res.successed === '00') {

          this.loadData();

        } else {
          console.log(res.message);
        }
      });
  }

  public toCalcWorkTime(){

    this.bCalcWorkTime = true;

    let requestParam = new URLSearchParams();
    requestParam.set('id', this.salaryInvoice.id);
    this.corpSalaryInvoiceService.toCalcWorkTime(requestParam)
      .subscribe(res => {
        this.bCalcWorkTime = false;

        if (res.successed === '00') {

        } else {
          console.log(res.message);
        }
      });
  }

  public toBack() {

    if(this.backAction === 'query'){
      this.router.navigate(['/pages/lafinance/salaryinvoice']);
    }else if(this.backAction === 'apply'){
      this.router.navigate(['/pages/lafinance/salaryinvoiceapply']);
    }else if(this.backAction === 'approved'){
      this.router.navigate(['/pages/lafinance/salaryinvoiceapproved']);
    }


  }

  toPay(){

    this.bPay = true;

    let requestParam = new URLSearchParams();
    requestParam.set('id', this.curId);

    this.corpSalaryInvoiceService.toPay(requestParam)
      .subscribe(res => {
        this.bCalcWorkTime = false;
        if (res.successed === '00') {
          this.loadData();
          alert("支付成功");
        } else {
          alert(res.message);
        }
      });

  }

  setPage(event){

  }
}
